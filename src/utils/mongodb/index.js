const mongoose = require('mongoose');

const logger = require('../log4js').getLogger('mongodb');
const config = require('../../libs/server/config');
const model = require('../../models');

/**
 * 连接mongodb，获取mongo客户端实例
 * @returns
 */
async function createMongoClient () {
  const processName = process.env.proc_name || process.pid;

  try {
    const { mongodb } = config;
    const { user, password, host, port = 27017, db, autoReconnect = true, reconnectTries = 10, reconnectInterval = 1000, poolSize = 600 } = mongodb;

    const client = await mongoose.connect(`mongodb://${host}:${port}/${db}`, {
      user,
      pass: password,
      autoReconnect,
      poolSize,
      reconnectTries,
      reconnectInterval,
    });

    const { connection } = client;

    connection.on('disconnected', () => {
      logger.warn(`${processName}与 mongodb 连接断开`);
    });

    connection.on('error', (err) => {
      logger.error(`${processName}与 mongodb 连接发生错误`, err);
    });

    connection.on('reconnected', () => {
      logger.info(`${processName}与 mongodb 重连成功`);
    });

    logger.info(`${processName}连接 mongodb 成功`);

    client.model = model;
    return client;
  } catch (err) {
    logger.error(`${processName}连接 mongodb 失败`, err);
  }
}

module.exports = createMongoClient;
