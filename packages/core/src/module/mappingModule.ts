import { Manager } from "../decorator/manager"
import {
    IApplicationContext,
    IModule,
    MetadataKeys,
    RouterMapping,
} from "../interface"

export class MappingModule implements IModule {
    resolve(applicationContext: IApplicationContext): void {
        const rootContainer = applicationContext.getRootContainer()
        const routerMapping: RouterMapping[] = []
        rootContainer.getControllerMap().forEach((controller) => {
            const prototype = controller.prototype
            const rootPath = Manager.getMetadata(
                MetadataKeys.isController,
                controller
            )
            const methodsNames = Object.getOwnPropertyNames(prototype).filter(
                (methodName) =>
                    methodName !== "constructor" &&
                    typeof prototype[methodName] === "function"
            )
            routerMapping.push(
                ...methodsNames.map((methodName) => {
                    const fn: Function = prototype[methodName]
                    const route: string = Manager.getMetadata(
                        MetadataKeys.isPath,
                        fn
                    )
                    const method: string = Manager.getMetadata(
                        MetadataKeys.isMethod,
                        fn
                    )
                    const params: {
                        param: string
                        paramType: Function
                        paramPosition: string
                    }[] = Manager.getMetadata(
                        MetadataKeys.isParam,
                        prototype,
                        methodName
                    )
                    return {
                        route: rootPath + route,
                        method,
                        fn: fn.bind(prototype),
                        params,
                        methodName,
                    }
                })
            )
        })
        applicationContext.setMapping(routerMapping)
    }
}
