import * as Router from 'koa-router';
import Room from '../model/room';
import Result from '../model/result';
import { queryRoom, addRoom } from '../service/company';

let router = new Router();

router.get('/query', async ctx => {
  //TODO  定义 Result 模型，并返回值
  ctx.body = Result.success(await queryRoom());
});

router.post('/addroom', async ctx => {
  let room: Room = ctx.request.body;
  let isCreatedSuccess = await addRoom(room);
  if (isCreatedSuccess) {
    ctx.body = Result.success(room);
  } else {
    ctx.body = Result.error('房间位置冲突或者房间创建失败', '1001');
  }
  //TODO  定义 Result 模型，并返回值
});

export default router;
