'use strict';
const Controller = require('egg').Controller;

const defaultAvatar = 'https://img0.baidu.com/it/u=3633528066,3949023113&fm=26&fmt=auto' // 默认头像

class UserController extends Controller {
  async register (name) {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // 判空操作
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null,
      };
      return;
    }
    const userInfo = await ctx.service.user.getUserByName(username)
    // 判断是否已经存在
    if (userInfo?.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null
      }
      return
    }
    // 调用 service 方法，将数据存入数据库。
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '萌新驾到',
      avatar: defaultAvatar,
      create_time: new Date()
    });
    ctx.body = {
      code: result ? 200 : 500,
      msg: result ? '注册成功' : '注册失败',
      data: null
    }
  }
  async login (name) {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象。
    const { ctx, app } = this;
    const { username, password } = ctx.request.body
    const userInfo = await ctx.service.user.getUserByName(username)
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }
    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && password != userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }
    // 生成 token 加盐
    // app.jwt.sign 方法接受两个参数，第一个为对象，对象内是需要加密的内容；第二个是加密字符串
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret)

    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token
      },
    };
  }
  // 验证方法 中间件已经拦截
  async test () {
    const { ctx, app } = this;
    // 通过 token 解析，拿到 user_id
    const token = ctx.request.header.authorization; // 请求头获取 authorization 属性，值为 token
    // 通过 app.jwt.verify + 加密字符串 解析出 token 的值 
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 响应接口
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        ...decode
      }
    }
  }
  // 获取用户信息
  async getUserInfo () {
    const { ctx, app } = this;
    // 通过 token 解析，拿到 user_id
    const token = ctx.request.header.authorization
    // 通过 app.jwt.verify 方法，解析出 token 内的用户信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const { id, username, signature, avatar } = decode
    const userInfo = await ctx.service.user.getUserByName(username)
    // userInfo 中应该有密码信息
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id,
        username,
        signature: signature || '',
        avatar: avatar || defaultAvatar
      }
    }
  }
  //编辑
  async editUserInfo () {
    const { ctx, app } = this;
    // 通过 token 解析，拿到 user_id
    const { signature = '' } = ctx.request.body
    try {
      let user_id
      const token = ctx.request.header.authorization;
      // 解密 token 中的用户名称
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // 通过 username 查找 userInfo 完整信息
      const userInfo = await ctx.service.user.getUserByName(decode.username)
      // 通过 service 方法 editUserInfo 修改 signature 信息。
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature
      });

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username
        }
      }
    } catch (error) {

    }
  }
}
module.exports = UserController;
