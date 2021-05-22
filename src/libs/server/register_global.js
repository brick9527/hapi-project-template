const createMongoClient = require('../../utils/mongodb');
const createRedisClient = require('../../utils/redis');

async function registerGlobal (global) {
  // 注册数据库客户端
  global.mongoClient = await createMongoClient();

  global.redisClient = createRedisClient();
}

module.exports = registerGlobal;
