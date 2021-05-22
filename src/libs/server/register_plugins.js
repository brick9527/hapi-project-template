const registerRoutes = require('./register_routes');

module.exports = async function (server) {
  // 注册路由
  await registerRoutes(server);
};
