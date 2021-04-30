const hapi = require('@hapi/hapi');

const registerRoutes = require('./libs/server/register-routes');

const start = async () => {
  // 实例化一个server，并指定server的端口号
  const server = hapi.server({ port: 3000 });

  // 注册路由
  registerRoutes(server);

  // 启动服务
  await server.start();
  console.log('server is running at ', server.info.uri);
};

start();
