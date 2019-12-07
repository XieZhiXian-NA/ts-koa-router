import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'
type LoadOptions = {
    /**
    * 路由文件扩展名，默认值是`.{js,ts}`
    */
    extname?: string
}
type RouteOptions = {
    /**
    * 适用于某个请求比较特殊，需要单独制定前缀的情形
    */
    prefix?: string
    /**
    * 给当前路由添加一个或多个中间件
    */
    middlewares?: Array<Koa.Middleware>;
}

const router = new KoaRouter();
const decorate = (method: HTTPMethod,path:string,options:RouteOptions={},router:KoaRouter)=>{
    return (target,property:string)=>{
        //异步加载 process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行
        // 当函数装饰器被调用时不执行调用nextick() 当类装饰器被调用时再执行一系列的回调函数
        process.nextTick(()=>{
                const middlewares = []
                //类的中间件先执行
                if(target.middlewares){
                    middlewares.push(...options.middlewares)
                }
                //检验中间件
                if(options.middlewares){
                    middlewares.push(...options.middlewares)
                }
                //主中间件 保证了主中间件在校验中间件执行完后才执行
                middlewares.push(target[property])
                const url = options.prefix ? options.prefix + path:path
                //router[method](url,target[property])
                //router.get('/user',执行一组中间件)
                router[method](url,...middlewares)
       })
        //添加中间件
       
    }
}
const method = method=>(path:string,options?:RouteOptions)=> decorate(method,path,options,router)
//get最后的样式是(path:string,options?:RouteOptions)=>{return (target,property:string)=>{ }
//还是标准的装饰器
export const get =method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del') 

/**
 * @description 获取路由
 * @param folder 
 * @param options 
 */
export const load = (folder:string,options:LoadOptions = {}):KoaRouter =>{
    //默认只遍历ts js
    const extname = options.extname || '.{js,ts}' 
    //遍历routes文件夹所有以.js|.ts结尾文件 ./ **/*${extname} 返回一个数组[user.ts,xxx.ts]
    glob.sync(require('path').join(folder,`./**/*${extname}`)).forEach(item =>{
        //将class引进来 执行装饰器函数@get('/users') @post('/users') router.get()....开始执行 
        require(item)
        return router
    })
}
//类级中间件 将中间件绑定在对象的原型上
//方法的中间件执行早于类的中间件
export const middlewares = (middlewares:Koa.Middlewares[])=>{
   return target=>{
       target.prototype.middlewares = middlewares
   }
}
