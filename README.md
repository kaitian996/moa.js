# moa

一个node后端框架  
具有IOC控制反转、DI依赖注入等特性  
提供多种装饰器 如：
```javascript
Get, Post, Patch, Put, Delete, Options, Head, All  //路由方法装饰器
Query, Body, Headers  //参数装饰器
Controller, Provider, Inject  //IOC装饰器
```

## Demo
> 更详细demo参考`play`文件夹下的demo
```shell
# 目录结构
src
|-Controller.ts #controller层
|-Service.ts #service层
start.ts #start
```
### controller层

```js
// Controller.ts

import { Get, Post, Controller, Inject, Query } from '@moa.js.js/decorator'
import { adminService } from './Service'

@Controller('/admin') //根路由
export class Admin {
    // 依赖注入，无需显式new 操作，即可获得实例对象
    @Inject()
    public service: adminService;
    
    // get请求
    @Get('/name') //子路由
    async getName(@Query('name') name: string, @Body('age') age: number,@Headers('who') who: string) { // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return { name, age,who }
    }
    
    // post请求
    @Post('/postName')
     async postName(@Body('name') name: string) { // 获取body中的name参数
        console.log('postName');
        return name
    }
}
```
目前提供了 `Get, Post, Patch, Put, Delete, Options, Head, All`等请求方法
### service层
```js
// Service.ts
import {Provider} from '@moa.js/decorator';

//提供依赖
@Provider()
export class adminService {
    async run() {
        console.log('car is running!');
    }
}
```

### 启动项目

```js
// start.ts
import { setupGlobalApplicationContext } from "@moa.js/core"
import { resolve } from "path"
const app = setupGlobalApplicationContext({
    appDir: resolve(process.cwd(), "src"),
    baseDir: resolve(process.cwd(), "src"),
})
app.run()
```
```shell
#启动项目
ts-node start.ts
```
##### 输出
```shell
service is runing at http://localhost:3000
```
即可访问接口：127.0.0.1:3000/admin/name?name=lili
```js
响应结果：lili
```

## 特性

### 依赖注入
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
}

```
通过` @Provider()`提供依赖 ,通过 ` @Inject()` 即可注入依赖 

### 路由
> 声明式的定义定义路由
```js
import { Get, Post, Controller, Inject, Query } from '@moa.js/decorator'

@Controller('/') //根路由，最终访问路径为根路由加上子路由
export class Admin {

    // get请求
    @Get('name')  //子路由
    async getName() { 
        console.log('getName');
        return 
    }
    
    // post请求
    @Post('postName')
    async postName() {
        console.log('postName');
        return 
    }
}
```

### 参数获取

```js
@Controller('/')
export class Admin {

    // get请求
    @Get('name') 
    async getName(@Query('name') name: string, @Body('age') age: number,@Headers('who') who: string) { // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return { name, age,who }
    }
    
    // post请求
    @Post('postName')
    async postName(@Body() name: Obejct) { // 参数装饰器不传入参数时，默认将全部参数获取为一个对象如 {name:"lili",age:18}
        console.log('postName');
        return name
    }
}
```
目前提供了`@Query()`,`@Body()`,`@Headers()` 来分别获取query、body、header参数

### 装饰器自动扫描
> 无论各类装饰器如何嵌套，只要位于src文件夹下，启动时都会自动扫描到
```shell
# 目录结构
src
|-controller #controller层
 |
 |-userController
   |
   user.controller.ts
|-service #service层
 |
 |-userService
   |
   user.service.ts

start.ts #start
```

### 可选配置
> 只需要利用`@Configuration`装饰器，并且实现`IConfig`接口即可
```ts
import { IConfig, IConfiguration } from "@moa.js/core"
import { Configuration } from "@moa.js/decorator"

@Configuration()
export class Config implements IConfig {
    resolve(): IConfiguration {
        return {
            port: 3001,
        }
    }
}
```