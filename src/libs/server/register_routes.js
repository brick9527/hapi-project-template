const userRoutePlugin = require('../../plugins/routes/user');

module.exports = async function (server) {
  // 注册用户模块路由
  await server.register(userRoutePlugin, { routes: { prefix: '/api/user' } });

  // 404处理
  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return h.response({ status: 404, message: '404 Not Found' }).code(404);
    },
  });

  return server;
};
