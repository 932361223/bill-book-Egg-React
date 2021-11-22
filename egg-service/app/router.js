'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, middleware, controller } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  // 测试用例
  router.get('/', controller.home.index);
  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);
  router.post('/edit_user', controller.home.editUser);
  router.post('/del_user', controller.home.delUser);
  //
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/test', _jwt, controller.user.test); // 放入第二个参数，作为中间件过滤项
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo);
  router.post('/api/upload', controller.upload.upload);
  router.post('/api/bill/add', _jwt, controller.bill.add);
  router.get('/api/bill/list', controller.bill.list);
  router.get('/api/bill/detail', _jwt, controller.bill.detail); // 获取详情
  router.post('/api/bill/update', _jwt, controller.bill.update);// 账单更新
  router.post('/api/bill/delete', _jwt, controller.bill.delete); // 删除账单
  router.get('/api/bill/data', _jwt, controller.bill.data); // 获取数据
  router.get('/api/bill/type', _jwt, controller.bill.type); // 获取数据
};
