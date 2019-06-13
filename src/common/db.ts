import Company from '../model/company';
const mysql = require('promise-mysql');
const http = require('http');
// 连接到服务器
let db = mysql.createPool({
  host: '116.85.0.241',
  database: 'jinhaolinsql',
  username: 'jinhaolin',
  password: 'Jhl10086',
  port: '27931'
});


// 模拟DB
export namespace DB {
  export let company: Company;
  export let query = async (sql: any, data: any) => {
    try {
      const result = await db.query(sql, data);
      return result;
    } catch (error) {
      console.error(error);
    }
    return null;
  };
}

