//从这里启动web框架
import { IApplicationContext, IModule } from "../interface"
import { createApplication, createRouter } from "@moa.js/koa"
export class FrameworkModule implements IModule {
    public resolve(applicationContext: IApplicationContext): void {
        applicationContext.setFramework(createApplication(), createRouter())
    }
}