const jwt = require('../../plugins/jwt');
const registerRoutes = require('./register_routes');

module.exports = async function (server) {
  // 注册jwt
  await server.register(jwt);

  // 注册路由
  await registerRoutes(server);
};
