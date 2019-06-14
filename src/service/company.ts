import Room from '../model/room';
import Point from '../model/point';
import { DB } from '../common/db';

const db = require('../common/pool');
const rsql = require('../common/sql/roomsql');

/**
 * 添加会议室信息
 * @param room 会议室
 */
export async function addRoom(room: Room) {
  await queryRoom();
  let conflict = checkRoomConflict(room);
  if (conflict) {
    return false;
  }
  const result = await db.query(
    rsql.INSERT_NEW_ROOM(
      room.name,
      room.capacity,
      JSON.stringify(room.start),
      JSON.stringify(room.end)
    )
  );
  if(result <= 0) {
    return false;
  }
  return true;
}

export async function deleteRoom(id: number) {
  const result = await db.query(rsql.DELETE_ROOM(id));
  if(result <= 0) {
    return false;
  }
  return true;
}

export async function updateRoom(room: Room) {
  const result = await db.query(rsql.UPDATE_ROOM(room.id,room.name,room.capacity,room.status));
  if(result <= 0) {
    return false;
  }
  return true;
}

/**
 * TODO 完善代码
 * 查询会议室信息
 */
export async function queryRoom() {
  const results = await db.query(rsql.QUERY_ALL_ROOM);
  DB.company.roomList = [];
  for (let r of results) {
    let start = JSON.parse(r.start_point);
    let end = JSON.parse(r.end_point);
    let startPoint: Point = {
      x: start.x,
      y: start.y
    };
    let endPoint: Point = {
      x: end.x,
      y: end.y
    };
    let room: Room = {
      id: r.id,
      start: startPoint,
      end: endPoint,
      capacity: r.capacity,
      name: r.name,
      status: r.status
    };
    DB.company.roomList.push(room);
  }
  return DB.company.roomList;
}
/**
 * TODO 完善代码
 * 判断房间位置是否冲突
 * @param room 房间
 */
function checkRoomConflict(room: Room): boolean {
  DB.company.roomList = DB.company.roomList || [];
  function getWidth(room: Room) {
    return room.start.x - room.end.x;
  }
  function getHeight(room: Room) {
    return room.start.y - room.end.y;
  }
  function getCenter(room: Room): Point {
    return {
      x: (room.start.x + room.end.x) / 2,
      y: (room.start.y + room.end.y) / 2
    };
  }

  let newRoomCenter: Point = getCenter(room);
  let newRoomWidth = getWidth(room);
  let newRoomHeight = getHeight(room);

  for (let oldRoom of DB.company.roomList) {
    let oldRoomCenter: Point = getCenter(oldRoom);
    let oldRoomWidth = getWidth(oldRoom);
    let oldRoomHeight = getHeight(oldRoom);

    if (
      Math.abs(2 * (oldRoomCenter.x - newRoomCenter.x)) <
        Math.abs(newRoomWidth + oldRoomWidth) &&
      Math.abs(2 * (oldRoomCenter.y - newRoomCenter.y)) <
        Math.abs(newRoomHeight + oldRoomHeight)
    ) {
      return true;
    }
  }
  return false;
}
