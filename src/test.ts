// // 类装饰器
// // function anotationClass(id){
// //     console.log('anotationClass evaluated', id);
// //     return (target) => console.log('anotationClass executed', target.name);
// // }
// // // 方法装饰器
// // function anotationMethods(id){
// //     console.log('anotationMethods evaluated', id);
// //     return (target, property, descriptor) => console.log('anotationMethods executed', target.name);
// // }
// function dd(target){
//     console.log('anotationClass evaluated', 'dd');
//     return (target) => console.log('anotationClass executed', target.name);
// }
// function pp(target){
//     console.log('anotationClass evaluated', 'pp');
//     return (target) => console.log('anotationClass executed', target.name);
// }
// // 方法装饰器
// // function kk(target){
// //     //console.log('anotationMethods evaluated', id);
// //     return (, property, descriptor) => console.log('anotationMethods executed', target.name);
// // }

// @dd(1)
// @pp(1)
// class Example {
//    // @anotationMethods(1)
//     //@anotationMethods(2)
//     method(){}
// }

//日志应用和切面实现
// console.log('日志应用和切面实现.....')
// function log(target, name, descriptor) {
//     console.log('target',target)
//     console.log('name',name)
//     console.log('descriptor',descriptor.value)
//     var oldValue = descriptor.value;

//     descriptor.value = function () {
//         console.log(`Calling "${name}" with`, arguments);
//         var value = oldValue.apply(null, arguments);
//         console.log(value)
//         return value
//     }
//     return descriptor;
// }
// class Maths {

//     @log
//     add(a, b) {
//         return a + b;
//     };
// }
// const math = new Maths()
// console.log('ppp');
//  console.log('math',math.add(2, 4)) 

// 类装饰器
function anotationClass(target) {
    console.log('===== Class Anotation =====')
    console.log('target :', target)
}

// 方法装饰器
function anotationMethods (target, property, descriptor) {
        // target 
        console.log('===== Method Anotation ' + property + "====")
        console.log('target:', target)
        console.log('property:', property)
        console.log('descriptor:', descriptor)
}

@anotationClass
class Example {
    @anotationMethods
    instanceMember() { }

    @anotationMethods
    static staticMember() { }
}