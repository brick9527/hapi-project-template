const { fork } = require('child_process');
const objectMerge = require('fd-object-merge');

const logger = require('../../utils/log4js').getLogger('process_factory');

class ProcessFactory {
  /**
   * 构造函数
   * @param {any} param - 初始化参数
   * @property {String} processName - 进程名
   * @property {String} main - 入口文件
   * @property {Array<String>} args - 启动进程所带参数
   * @property {Number} maxRestart - 最大重启次数
   */
  constructor ({ processName, main, args, maxRestart = 10 } = {}) {
    this.state = {
      processName,
      main,
      args,
      maxRestart,
      lock: false,
      restartCount: 0
    };

    this.process = null;

    this.run = this.run.bind(this);
    this.restart = this.restart.bind(this);
    this.exit = this.exit.bind(this);
  }

  run () {
    // 检查进程是否处于锁定状态
    if (this.state.lock) {
      logger.warn(`process ${this.state.processName} is locked. ignore create.`);
      return;
    }
    this.state.lock = true;

    // 检查进程重启次数是否超过限制
    if (this.state.restartCount >= this.state.maxRestart) {
      logger.warn(`process ${this.state.processName} restart max times.`);
      return;
    }

    const initProcessArgs = {
      env: {
        processName: this.state.processName,
      }
    };
    const processArgs = objectMerge(initProcessArgs, this.state.args);

    this.process = fork(this.state.main, processArgs);

    this.state.processName = this.state.processName || this.process.pid;

    this.state.restartCount++;

    logger.info(`Process ${this.state.processName} started ${this.state.restartCount} time`);

    this.state.lock = false;

    this.process.on('exit', code => {
      logger.info(`${this.state.processName} exit with code ${code}`);
      if (code !== 0 && !this.lock) {
        this.run();
      }
    });

    this.process.on('error', (error) => {
      logger.error(`${this.state.processName} error. ${error}`);
    });
  }

  restart () {
    if (!this.process) {
      this.run();
      return;
    }
    this.process.kill();
    this.run();
  }

  exit () {
    this.process && this.process.kill('SIGTERM');
  }
}

module.exports = ProcessFactory;
