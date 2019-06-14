import Point from '../../model/point';

// 查询所有房间的坐标
const QUERY_ALL_ROOM = 'select * from room order by name asc';

// 添加新房间
const INSERT_NEW_ROOM = (
  name: string,
  limit: number,
  start: string | Point,
  end: string | Point
) =>
  `insert into room (gmt_created, gmt_modified, name, 
    capacity, start_point, end_point) values(now(), now(), '${name}', '${limit}', '${start}', '${end}')`;

const DELETE_ROOM = (id: number) => `delete from room where id = '${id}'`;

const UPDATE_ROOM = (
  id: number,
  name: string,
  capacity: number,
  status: number
) =>
  `update room set gmt_modified = now(), name = ${name}, capacity = ${capacity}, status = ${status} where id = ${id}`;
module.exports = {
  QUERY_ALL_ROOM,
  INSERT_NEW_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM
};
