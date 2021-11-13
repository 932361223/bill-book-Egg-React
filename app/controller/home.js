'use strict';
/**
 * 测试用的文件
 */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const { ctx } = this;
    // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
    await ctx.render('index.html', {
      title: '123',
    });
    ctx.body = id;
  }
  // 获取用户信息
  async user () {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
  }
  async addUser () {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }

  }
  async editUser () {
    const { ctx } = this;
    const { name, id } = ctx.request.body;
    try {
      const result = await ctx.service.home.editUser(name, id);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }
  async delUser () {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.home.delUser(id);
      ctx.body = {
        code: 200,
        msg: '编辑成功',
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: '添加失败',
        data: null,
      };
    }
  }
}
module.exports = HomeController;
