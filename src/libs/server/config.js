const { load, dump } = require('js-yaml');
const fs = require('fs');
const path = require('path');
const objectMerge = require('fd-object-merge');

const logger = require('../../utils/log4js').getLogger('config');

/**
 * 读取YML文件的配置
 * @param {String} filePath - 文件的部分路径
 * @returns
 */
function loadYML (filePath) {
  const fullPath = path.join(__dirname, '../../../', filePath);
  return load(fs.readFileSync(fullPath, { encoding: 'utf-8' }));
}

/**
 * 将模板配置与默认配置合并
 * @returns
 */
function getDefaultConfig () {
  const SAMPLE_CONFIG_PATH = 'config/config.sample.yml';
  const CONFIG_PATH = 'config/config.yml';

  // 获取模板配置
  const sampleConfig = loadYML(SAMPLE_CONFIG_PATH);
  // 获取本地配置
  const localConfig = loadYML(CONFIG_PATH) || {};

  const defaultConfig = objectMerge(localConfig, sampleConfig);
  // 覆盖本地配置为最新配置
  const localConfigPath = path.join(__dirname, '../../../', CONFIG_PATH);
  fs.writeFile(localConfigPath, dump(defaultConfig), { encoding: 'utf-8', flag: 'w+' }, (err) => {
    if (err) {
      logger.warn('写入本地配置文件错误。', err);
    }

    logger.info('写入本地配置文件成功');
  });

  return defaultConfig;
}

module.exports = getDefaultConfig();
