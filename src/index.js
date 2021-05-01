const hapi = require('@hapi/hapi');

const registerRoutes = require('./libs/server/register-routes');
const { connect } = require('./utils/mongodb');

const start = async () => {
  // 设置主进程名称
  process.env.proc_name = 'server';

  // 实例化一个server，并指定server的端口号
  const server = hapi.server({ port: 3000 });

  // 全局变量注册
  global.client = await connect();

  // 注册路由
  registerRoutes(server);

  // 启动服务
  await server.start();
  console.log(`${process.env.proc_name} is running at ${server.info.uri}`);
};

start();
