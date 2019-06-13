import Room from './room';

export default interface Company {
  // X宽度
  width: number;

  // Y宽度
  height: number;

  // 公司房间信息
  roomList?: Room[];
}
