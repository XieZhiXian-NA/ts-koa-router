import * as Koa from 'koa'
//import * as Router from 'koa-router'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
import {load} from './utils/decors'
import {resolve} from 'path'
 
const router= load(resolve(__dirname,'./routers')) 

//const route = new Router()
const app = new Koa();
app.use(timing());
app.use(serve(`${__dirname}/public`));
app.use(
    bodify({
        multipart: true,
        // 使用非严格模式，解析 delete 请求的请求体
        strict: false,
    }),
);
// app.use((ctx: Koa.Context) => {
//     ctx.body = 'hello'
// })
app.use(router.routes())
app.listen(3000, () => {
    console.log('服务器在3000端口启动成功');
});