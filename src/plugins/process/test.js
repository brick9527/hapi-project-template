const path = require('path');

const ProcessFactory = require('../../libs/process/process_factory');

module.exports = {
  name: 'testProcess',
  register: async function (server, options) {
    const testProcess = new ProcessFactory({
      processName: 'testProcess',
      main: path.join(__dirname, '../../process/test.js'),
    });
    testProcess.run();
  }
};
