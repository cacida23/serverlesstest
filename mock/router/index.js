const Router = require('koa-router');
const Mock = require('mockjs');

const router = new Router();
const userList = Mock.mock({
  'list|1-10': [{
    'id|+1': 1,
    'user_id|100-200': 1,
    'status|1': true, // 状态
    'user_name': '@cname', // 名称
    'avatar': `@image('150x150', '#4a7bf7', 'img', 'png', 'Tiger')`, // 头像
    'create_time': `@datetime("yyyy-MM-dd HH:mm:ss")`, // 创建日期
  }]
});


router.get('/api/user/list', async ctx => {
  ctx.body = { code: 200, data: userList.list, message: 'success' };
});

router.post('/api/user/add', async ctx => {
  let data = {
    ...ctx.request.body,
    id: userList[userList.length - 1] + 1,
    ...Mock.mock({
      'user_id|100-200': 1,
      'status|1': false, // 状态
      'avatar': `@image('150x150', '#4a7bf7', 'img', 'png', 'Tiger')`, // 头像
      'create_time': `@datetime('yyyy-MM-dd HH:mm:ss')`, // 创建时间
    }),
  };

  userList.push(data);

  ctx.body = { code: 200, data: null, message: 'success' };
});

module.exports = router;
