const routes = require('../../routes');

module.exports = function (server) {
  server.route(routes);
  return server;
};
