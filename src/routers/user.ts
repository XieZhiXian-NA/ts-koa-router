import * as Koa from 'koa'
import {get,post,middlewares} from '../utils/decors'
import { resolve } from 'q'

const users =[{name:'tom'}]

//数据库查询
const api = {
    findByName(name){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(name === 'xia'){
                    reject('应户名已存在')
                }else{
                    resolve()
                }
            },500)
        })
    }
}
//鉴权 类级中间件 其他函数(函数装饰器)的执行在这个中间件之后
@middlewares([
    async function guard(ctx:Koa.Context,next:()=>Promise<any>){
        console.log('guard',ctx.header)
        if(ctx.header.token){
            await next()
        }else{
            throw "请登录"
        }
    }
])
export default class User{
    /**
     * @router get /api/getList
     * @param ctx 
     */
    @get('/users')
    public list(ctx: Koa.Context){
        ctx.body = {ok:1,data:users}
    }
     @post('/users',{
        middlewares:[
            async function validation(ctx:Koa.Context,next:()=>Promise<any>){
                const name = ctx.request.body.name
                if(!name){
                    throw '请输入用户名'
                }try {
                    await api.findByName(name)
                    await next()
                } catch (error) {
                    throw error
                    
                }
            }
        ]
    })
    public add(ctx: Koa.Context){
        users.push(ctx.request.body)
        ctx.body={ok:1}
    }
}