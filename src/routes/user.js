const userHandler = require('../handler/user');

module.exports = [
  // 测试页
  { method: 'GET', path: '/', config: userHandler.test },
];
