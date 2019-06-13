import * as Router from 'koa-router';
let router = new Router();
router.get('/query', async ctx => {
  ctx.body = 'hello room';
});

export default router;
