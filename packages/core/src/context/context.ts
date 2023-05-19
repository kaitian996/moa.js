import {
    IApplicationContext,
    IConfiguration,
    IDecoratorScanner,
    RouterMapping,
} from "../interface"
import type { RootContainer } from "./container"
import type { koa, router } from "@moa.js/koa"
export class ApplicationContext implements IApplicationContext {
    private configuration: IConfiguration
    private decoratorScanner: IDecoratorScanner
    private rootContainer: RootContainer
    private moduleMap: WeakMap<Function, Function> = new WeakMap()
    private routerMapping: RouterMapping[]
    private framework: koa
    private router: router

    public setRootContainer(rootContainer: RootContainer): void {
        this.rootContainer = rootContainer
    }
    public getRootContainer() {
        return this.rootContainer
    }
    public setDecoratorScanner(decoratorScanner: IDecoratorScanner): void {
        this.decoratorScanner = decoratorScanner
    }
    public startDecoratorScanner() {
        this.decoratorScanner.run()
    }
    public setMapping(routerMapping: RouterMapping[]): void {
        this.routerMapping = routerMapping
    }
    public setConfiguration(configuration: IConfiguration): void {
        this.configuration = configuration
    }
    public setFramework(framework: koa, router: router): void {
        this.framework = framework
        this.router = router
    }
    public loadModule(module: Function): void {
        this.moduleMap.set(module, module)
    }
    public initModule(module: Function): void {
        const moduleConstructor = this.moduleMap.get(module)
        //@ts-ignore
        const moduleInstance = new moduleConstructor()
        moduleInstance.resolve(this)
    }
    public run(): void {
        this.routerMapping.forEach((routerItem) => {
            this.router[routerItem.method](routerItem.route, async (ctx) => {
                const params =
                    routerItem.params?.map((paramObject) => {
                        return paramObject.param === "*"
                            ? ctx.request[paramObject.paramPosition]
                            : paramObject.paramType(
                                  ctx.request[paramObject.paramPosition][
                                      paramObject.param
                                  ]
                              )
                    }) || []
                ctx.body = await routerItem.fn(...params)
            })
        })
        this.framework.use(this.router.routes())
        this.framework.use(this.router.allowedMethods())
        this.framework.listen(this.configuration.port, () => {
            console.log(
                `service is runing at http://localhost:${this.configuration.port}`
            )
        })
    }
}
