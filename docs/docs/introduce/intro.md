# 介绍

Moa.js基于TypeScript 开发，结合了`面向对象（OOP + Class + IoC）`提供web后端接口的Node.js服务端开发体验
## 编程范式
面向对象（OOP + Class + IoC)  
Moa.js 支持面向对象的编程范式，为应用提供更优雅的架构。
> 下面是基于面向对象，开发路由的示例。
### 路由
```js
// Controller.ts
import { Get, Post, Controller, Inject, Query } from '@moa.js.js/decorator'

@Controller('/admin') //根路由
export class Admin {

    // get请求
    @Get('/name') //子路由
    async getName() { // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return 
    }
    
    // post请求
    @Post('/postName')
    async postName() { // 获取body中的name参数
        console.log('postName');
        return name
    }
}
```
## 依赖注入
> 无需显式的new 对象操作，即可获得对象实例
```js
import {Provider} from '@moa.js/decorator';

//提供依赖
@Provider()
export class adminService {
    async run() {
        console.log('car is running!');
    }
}
@Controller('/')
class controller{
    // 依赖注入
    @Inject()
    public service: adminService;

    @Post('/postName')
    async postName() { 
        await this.service.run() //无需实例化即可在此使用依赖实例
        return name
    }
}
```

## 参数获取
>提供了一系列参数装饰器获取请求参数
```js
@Controller('/')
export class Admin {

    // get请求
    @Get('name') 
    async getName(@Query('name') name: string, @Body('age') age: number,@Headers('who') who: string) { 
    // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return { name, age,who }
    }
    
    // post请求
    @Post('postName')
    async postName(@Body() name: Obejct) { 
    // 参数装饰器不传入参数时，默认将全部参数获取为一个对象如 {name:"lili",age:18}
        console.log('postName');
        return name
    }
}
```