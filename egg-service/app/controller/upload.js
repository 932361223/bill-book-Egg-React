'use strict';

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload () {
    const { ctx } = this;
    // 需要前往 config/config.default.js 设置 config.multipart 的 mode 属性为 file
    const file = ctx.request.files[0];

    // 声明存放资源的路径
    let uploadDir = '';
    try {
      // ctx.request.files[0] 表示获取第一个文件，若上传多个文件则可以遍历这个数组对象

      const f = fs.readFileSync(file.filepath);

      const day = moment(new Date()).format('YYYYMMDD');
      // 创建图片保存的路径
      const dir = path.join(this.config.uploadDir, day);

      const date = Date.now(); // 毫秒数

      await mkdirp(dir); // 不存在就创建目录
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename)); // path.extname拓展名
      // 写入文件夹
      fs.writeFileSync(uploadDir, f);
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }

    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, ''),
      // 最后我们访问的文件路径是这样的 http://localhost:7001/public/upload/20210521/1621564997310.jpeg
    };
  }
}

module.exports = UploadController;
