const { connect } = require('../../utils/mongodb');

async function registerGlobal (global) {
  // 注册数据库客户端
  global.mongoClient = await connect();
}

module.exports = registerGlobal;
