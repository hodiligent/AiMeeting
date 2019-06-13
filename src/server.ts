import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as fs from 'fs';
import { DB } from './common/db';
import * as koaBody from 'koa-body';

const app = new Koa();
const router = new Router();

//动态获取api中的api
const apiPath = require('path').join(__dirname, '/api');
fs.readdirSync(apiPath).forEach(file => {
  let sections = file.split('.');
  router.use(`/api/${sections[0]}`, require(`./api/${file}`).default.routes());
});

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
DB.company = { width: 100, height: 100, roomList: [] };

app.listen(3000);

console.log('AIMeeting-System running on port 3000');
