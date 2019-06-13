const mysql = require('promise-mysql');
const pool = mysql.createPool({
  host: '116.85.0.241',
  database: 'jinhaolinsql',
  user: 'jinhaolin',
  password: 'Jhl10086',
  protocol: 'mysql',
  port: '27931'
});

module.exports = {
  query: async (sql: any, data: any) => {
    try {
      const result = await pool.query(sql, data);
      return result;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
};
