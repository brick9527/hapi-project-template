/**
 * @file 用户路由组件，存放用户相关的路由
 * @prefix /api/user
 */
 const userRoutes = require('../../routes/user');

 module.exports = {
   name: 'userRoutePlugin',
   register: async function (server, options) {
     server.route(userRoutes);
   }
 };
 