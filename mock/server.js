const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app.use(router.routes());

app.listen(4000, () => {
  console.log('[mock/server.js]:', 'mock server run at 4000.');
});
