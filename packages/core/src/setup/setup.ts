import { DecoratorScanner } from "../common/decoratorScanner"
import { rootContainer } from "../context/container"
import { ApplicationContext } from "../context/context"
import { IApplicationContext, IGlobalOptions } from "../interface"
import { ConfigurationModule } from "../module/configurationModule"
import { FrameworkModule } from "../module/frameworkModule"
import { MappingModule } from "../module/mappingModule"
/**
 * @param globalOptions 全局启动配置文件
 */
export function setupGlobalApplicationContext(
    globalOptions: IGlobalOptions
): IApplicationContext {
    //step 1.生成全局上下文
    const applicationContext = prepareGlobalApplicationContext(globalOptions)
    //step 2.启动文件扫描，扫描文件中的装饰器
    applicationContext.startDecoratorScanner()
    //step 3.启动一系列module
    applicationContext.initModule(FrameworkModule)
    applicationContext.initModule(MappingModule)
    applicationContext.initModule(ConfigurationModule)
    //step 4返回全局context
    return applicationContext
}

export function prepareGlobalApplicationContext(globalOptions: IGlobalOptions) {
    const appDir = globalOptions.appDir ?? ""
    const baseDir = globalOptions.baseDir ?? ""
    //创建上下文，并且将rootContainer绑定在上面
    const applicationContext = new ApplicationContext()
    //bind rootContainer
    applicationContext.setRootContainer(rootContainer)
    //设置context中的装饰器扫描器类
    applicationContext.setDecoratorScanner(new DecoratorScanner(baseDir))
    //装载一系列module
    //1.koa模块
    applicationContext.loadModule(FrameworkModule)
    //2.mapping映射
    applicationContext.loadModule(MappingModule)
    //3.config
    applicationContext.loadModule(ConfigurationModule)
    //后续扩充
    return applicationContext
}
