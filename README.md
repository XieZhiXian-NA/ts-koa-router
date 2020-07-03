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

# ts基础

tsc xxx.ts 将其编译为.js文件并进行类型检查

tsc --outDir ./dist xxx.ts 将生成的js放到dist文件夹下

tsc --init初始化tsconfig.json 文件

再Terminal---run Task----watch ts 自动监听ts的改变 转化到js文件下面

只编译该目下的文件 直接使用tsc 回去查找该目录下的index.ts文件
"include":["./src/**/*"]

## 数据类型

1. 布尔类型 ```ts var flag:boolean = true```

<!-- 对整型和浮点类型没有做区分 统一为number -->

2. 数值类型 ```ts var num:number = 123```

<!-- 可以使用let const等声明变量 但是最终全部编译为var-->

3. 字符串类型 ```ts var str:string='1233'```

4. 数组类型 

```ts
    const arr:number[] = [1,2,3]
    let ar:Array<number> = [12.3,7.7]
```

5. 元祖类型 tuple

```ts
//传入的类型与定义的类型 要一一对应
 let tuple:[string,number,boolean] = ['123',3,true]
 //数组里面可以是任意的类型
 let a:any[] = ['ssss',23,'string']
```

6. 枚举类型

```ts
enum 枚举名{
    标识符[=整型常数]
}
enum Flag{
    success = 1,
    error = -1
}
enum Color{
 // 全部没有赋初始值 则默认为索引值
  blue,
  red,
  yellow
}
enum Color{
    // 默认值为索引值
    blue,
    red = 5,
    //此时orange的值为前一个值为基础 在上面加一
    orange
}
let f:Flag = Flag.success
```

7. 任意类型 any

```ts
   let a:any = 123
   a = '233'
```

8. null undefined  其他(never类型)数据类型的子类型

```ts
var p:undefined
console.log(p) //输出undefined 不报错

var p:number
console.log(p) // 输出undefined 报错

// 定义未赋值=undefined 
var num : number|undefined

var n:number | null | undefined
console.log('n',n)
```

9.void类型 定义方法没有返回值

```ts
 function add():void{
 }
 let c = ():void=>{
}
```

10. never类型 其他类型 包含null undefined 

只能声明never的变量只能被never类型所赋值 从来不会出现的值

```ts
var a:undefined
a = undefined // a只能被赋值为undefined

var b:null
b= null // b只能被赋值为null
```

## 函数

返回值与参数要规定

1. 函数声明法

```ts
  function run():string{
      return 'run'
  }
  //函数传参
  function run(name:string,age:number):string {
     return `${name}---${age}`
  }
  //方法的可选参数
  //es5里面方法的实参和行参个数可以不一样 但是ts中必须一样，如果不一样，可以配置可选参数 xxx?: 可传可不传
  // 可选参数必须配置到参数的最后面
  function info(name:string,age?:number):string {
     return name+age
  }

  //ts中设置默认值 
  function getInfo(name:string,age:number=7):string {
    return name+age
  }

  //剩余参数 三点运算符
  function getC(...result:number[]):number {
    let sum:number = 0
    for (let l of result){
        sum+=l
    }
    return sum
}
```

2. 匿名函数

```ts
    let run2 = function():string {
        return 'run2'
    }
    let run2 = function(name:string,age:number):string {
       return 'run2'
    }
```

3. 函数重载 通过为同一个函数提供多个函数类型定义

```ts
// 参数的类型
function css(age:number):number;
function css(name:string):string;
function css(conf:any):any{
   if(typeof conf === 'string') return '我的名字叫做'+conf
   return conf+10
}
// 调用css(78)走的是第二个函数
// 调用css(true) 报错 找不到重载（true）的函数

// 参数的个数
function getCss(name:string):string;
function getCss(name:string,age:number):number;
function getCss(name:any,age?:any){
    if(age) return age
    return name
}
```

4. 剩余参数是一个数组，所以标注的时候一定要注意 ...rest:Array<xxx>

5. this
   普通函数声明时时无法确定this的类型的


## 类

```ts
class Person{
     name:string;//省略public关键词 
     // name必须在外部声明
     constructor(n:string){
         this.name = n;
     }
     run():void{
      alert(this.name)
     }
}
// 简写
class User{
    //在构造函数中增加修饰符，则会自动在外部声明public name:string 避免重复写多余的代码
    constructor(
        public name:string,
        public age:number)
    {
         this.name = name;
    }
}
class per extends Person{
    constructor(name:string){
        super(name)
    }
    // 子类覆盖父类的同名方法
    run():void{
      console.log('xzx')
    }

}

```

### 类的修饰符

public: 公有 在类、子类、类外面都可以访问

private: 私有 只在类里面可以访问

protected: 保护类型 在类、子类里面可以访问

readonly:只读，在任意地方都可以访问

属性不加修饰符 默认就是公有的

### 静态属性、方法 

当一个类被创建时，产生了两种不同的类型，一个是类类对象，一个是类实例化出来的对象类型

```js
   function Person(){

   }
   Person.name = 'xzx'
   Person.add = function(){
   }
```

```ts
 class Person{
     public name:string;
     constructor(name:string){
         this.name = name
     }
     run():string{
       return this.name
     }
     static print():string{
         //静态方法没办法调用类属性
         // 只能调用静态属性 静态方法
     }
 }
```


```ts
class User {
    static genders = ['男', '女', '未知'];
    constructor(
        public username: string
    ) {
    }
    eat(): void {}
    static method():string { return ''}
}
//类对象具有的属性
interface UserObject {
    username: string;
    eat(): void;
}
//类类对象具有的属性
interface UserClass {
    //模拟的构造函数
    new(username: string): UserObject,
    genders: string[],
    method(): string;
}

let user1 = new User('mt');
function fn(arg: UserObject) {
}
fn(user1)


function fn(arg: UserClass) {
    return new arg('');
}
fn(User);
```


### 多态 

父类提供方法但不实现 具体的实现由子类实现


### 寄存器

对类成员属性进行更加细腻的控制，可以对要获取的值进行拦截并加以控制，更好的

控制成员属性的设置和访问边界。

```js
get _xxx(){
    // 获取前 先对有的值进行设置，再返回
    return '****' + this.xxx.subString(5,9)
}
user._xxx;

set _xxx(val){
  if(val===''''){
      this.xxx = val
  }
}
user._xxx = 'yyy'
```

### 抽象方法

提供其他类继承的基类，不能直接被实例化
abstract关键字定义抽象类和抽象方法，抽象类的抽象方法不包含具体实现并且必须在派生类中实现,
子类继承抽象类，则必须实现抽象类的方法。//react中的render函数

```ts
  abstract class Animal{
      abstract eat():void;
  }
  // 报错 不能直接实例化
  var a = new Animal()

  class Dog extends Animal{
      // 抽象类的子类必须实现抽象类里面的抽象方法
      eat(){
      }
  }

```


### interface 

接口起到一种限制和规范的作用
只规定这批类里必须提供某些方法，属性，索引，类

```ts
// 属性接口约束 对json 批量的属性

interface FullName{
    // 以分好结束
    firstName:string;
    second:string;
}

function printLabel(name:FullName):void{
    console.log('ddd')
}

var obj ={
    age:12,
    firstName:'xzx',
    secondName:'xlx'
}
//这样不报错 只要obj里面含有firstName secondName就可以
// 但是在函数内取不到age 一定要符合接口规约
printLabel(obj) 

//报错 传进去的对象只能包含firstName secondName
printLabel({
     age:12,
    firstName:'xzx',
    secondName:'xlx'
})
```

```ts
 //函数类型接口 
  1. 函数没有名称表示的是一个函数
  2. 函数有名称 表示的是一个对象里面特有的函数 要实现
 interface Imp{
     (key:string,value:string):string;
 }
 var md5:Imp = function(key,value){
     return 'xx'
 }
 interface Imp{
    eat(a:number,b:number):number;
}
let c2:Imp = {eat(a,b){return a+b}}

 // type类型定义的接口
 type callback=(a:number,b:number)=>number;
```

```ts
// 索引接口
interface Arr{
    //数组的索引下标为数字，值为string
    [index:number]:string
}
let a:Arr = ['123','345']
```

```ts
//类类型接口 对类的约束
interface Animal{
    name:string;
    eat(str:string):void
}

```


### type

与let一样 let存储的是数据值 type存的字面量是类型值
类型只存在于检测阶段

只可以定义对象类型
interface xx{}

type除了定义对象类型，还可以定义普通值
type a = string | number

interface具有类型合并 类型名可以合并
便于扩展接口

```ts
 interface user{
     username:string,
     age:number,
 }
 interface user{
     gender:number
 }
```





## 类型操作

虽然类型不能作为程序中的值去使用，但是 `TypeScript` 也提供了一些方式来操作类型这种数据

### typeof

在 `TypeScript` 中，`typeof` 有两种作用

- 获取数据的类型
- 捕获数据的类型

```typescript
let str1 = 'kaikeba';

// 如果是 let ，把 'string' 作为值
let t = typeof str1;

// 如果是 type，把 'string' 作为类型
type myType = typeof str1;

let str2: myType = '开课吧';
let str3: typeof str1 = '开课吧';
```

### keyof

获取类型的所有 `key` 的集合

```typescript
interface Person {
    name: string;
    age: number;
};
type personKeys = keyof Person;
// 等同：type personKeys = "name" | "age"

let p1 = {
    name: 'zMouse',
    age: 35
}
function getPersonVal(k: personKeys) {
    return p1[k];
}
/**
等同：
function getPersonVal(k: 'name'|'age') {
    return p1[k];
}
*/
getPersonVal('name');	//正确
getPersonVal('gender');	//错误
```

### in

针对类型进行操作的话，内部使用的 `for…in` 对类型进行遍历

```typescript
interface Person {
    name: string;
    age: number;
}
type personKeys = keyof Person;
type newPerson = {
    [k in personKeys]: number;
  	/**
  	等同 [k in 'name'|'age']: number;
  	也可以写成
  	[k in keyof Person]: number;
  	*/
}
/**
type newPerson = {
    name: number;
    age: number;
}
*/
```

注意：`in` 后面的类型值必须是 `string` 或者 `number` 或者 `symbol`



## 装饰器

`装饰器-Decorators` 在 `TypeScript` 中是一种可以在不修改类代码的基础上通过添加标注的方式来对类型进行扩展的一种方式

- 提高代码复用率
- 减少代码量
- 提高代码扩展性、可读性和维护性

> 在 `TypeScript` 中，装饰器只能在类中使用

使用：

1. 开启experimentalDecorators 编译选项
   `装饰器` 是一个函数，它可以通过 `@装饰器函数` 这种特殊的语法附加在 `类`、`方法` 、`访问符`(get,set)、`属性`、`参数` 上，对它们进行包装，然后返回一个包装后的目标对象（`类`、`方法` 、`访问符`、`属性`、`参数` ）

装饰器工作在类的构建(解析)阶段，而不是使用(new出对象)阶段，修改的是针对类的内容，而不是针对new出来的对象。

```js
function log(target:any,name:string,description:PropertyDescriptor){
   let fn = description.value;
   //修改描述符的value值，只有当调用该函数时，就是获取get函数获取value值才会去执行该方法。
   description.value = function(a:number,b:number){
       console.log('参数',a,b)
       let rs = fn(a,b);
       console.log('执行的结果',rs);
       return rs
   }
}
```


### 装饰器执行顺序

1. 实例装饰器
   ​属性 => 访问符 => 参数 => 方法

2. 静态装饰器
   ​属性 => 访问符 => 参数 => 方法

3. 类


## 元数据

在 `装饰器` 函数中 ，我们可以拿到 `类`、`方法` 、`访问符`、`属性`、`参数` 的基本信息，如它们的名称，描述符 等，但是我们想获取更多信息就需要通过另外的方式来进行：`元数据`


### 什么是元数据？ 

`元数据` ：用来描述数据的数据，在我们的程序中，`对象`、`类` 等都是数据，它们描述了某种数据，另外还有一种数据，它可以用来描述 `对象`、`类`，这些用来描述数据的数据就是 `元数据`

> 比如一首歌曲本身就是一组二进制数据，同时还有一组用来描述歌曲的歌手、格式、时长的数据，那么这组数据就是歌曲数据的元数据