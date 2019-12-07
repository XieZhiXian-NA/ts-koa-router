## 概念介绍

>装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。
>
>这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。
>
>我们通过下面的实例来演示装饰器模式的用法。其中，我们将把一个形状装饰上不同的颜色，同时又不改变形状类。

## 方法装饰器（target,property,description）
>-->target: 实例成员->类的原型对象
            静态成员-类的构造函数
 -->property:成员名字
 -->description:成员属性的描述符 description.value指向函数本身

 装饰器是在类声明时执行  不是在实例化时执行
 从上到下评估 从下到上执行

```ts
// 类装饰器 @anotationClass(id)传递参数时,使用装饰器工厂 普通函数返回一个表达    式（真正的的装饰器）
// 供装饰器运行时被调用

function anotationClass(id){
    console.log('anotationClass evaluated', id);
    return (target) => console.log('anotationClass executed', id);
}
```

## 配置ts环境
1. package.json创建： npm init -y
2. 开发依赖安装： npm i typescript ts-node-dev tslint @types/node -D
3. 启动脚本
```ts
    "scripts": {
    "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",
    "build": "tsc -P tsconfig.json && node ./dist/index.js",
    "tslint": "tslint --fix -p tsconfig.json"
    }
```
4. 加入tsconfig.json
```ts
{
    "compilerOptions": {
    "outDir": "./dist",
    "target": "es2017",
    "module": "commonjs",
    "sourceMap": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["es2015"],
    "typeRoots": ["./node_modules/@types"],
    },
    "include": ["src/**/*"]
}
```
## 路由功能
### 路由发现
```ts
function method1(method){
    return (path:string,options?:RouteOptions)=>{
            return  (method: HTTPMethod,path:string,options:RouteOptions={},router:KoaRouter)=>{
                     return (target,property:string)=>{
                         const url = options.prefix ? options.prefix+path:path
                         //router.get('/api/user',target[property]本类的函数名-->list,add
                           router[method](url,target[property])
                        }
            }
    }
}
```
### 路由注册

#### glob.sync(文件夹路径，optionss,cb)
>glob方法可以传入三个参数 
　　1、需要进行匹配的文件的路径（有点类似于正则表达式，但是比那个要简单的多。）。
　　2、option ./**/*.js（匹配包含.js的所有文件包括1：（文件夹-->文件夹-->**.js）2.**.js
　　3、回调函数，回调函数内部可以返回两个参数，一个是匹配成功后的结果会返回一个数组，如果没有匹配上不会报错会返回一个空数组，一个是失败后的结果。

