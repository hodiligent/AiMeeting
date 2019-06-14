import * as Router from 'koa-router';
import Room from '../model/room';
import Result from '../model/result';
import { queryRoom, addRoom, deleteRoom, updateRoom } from '../service/company';

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

router.post('/delete', async ctx => {
  let room: Room = ctx.request.body;
  let isDeleteSuccess = await deleteRoom(room.id);
  if (isDeleteSuccess) {
    ctx.body = Result.success("");
  } else {
    ctx.body = Result.error('房间删除失败', '1002');
  }
})

router.post('/update', async ctx => {
  let room: Room = ctx.request.body;
  let isUpdateSuccess = await updateRoom(room);
  if (isUpdateSuccess) {
    ctx.body = Result.success(room);
  } else {
    ctx.body = Result.error('房间更新失败', '1003');
  }
})

export default router;
