import type { koa, router } from "@moa.js/koa"
import type { RootContainer } from "../context/container"

export interface IGlobalOptions {
    baseDir?: string
    appDir?: string
}
export interface IConfiguration {
    port: number
}
export interface IConfig {
    resolve(): IConfiguration
}
export interface IApplicationContext {
    setRootContainer(rootContainer: RootContainer): void
    getRootContainer(): RootContainer
    setDecoratorScanner(decoratorScanner: IDecoratorScanner): void
    startDecoratorScanner(): void
    setConfiguration(configuration: IConfiguration): void
    setMapping(routerMapping: RouterMapping[]): void
    setFramework(framework: koa, router: router): void
    loadModule(module: Function): void
    initModule(module: Function): void
    run(): void
}
export interface IModule {
    resolve(applicationContext: IApplicationContext): void
}
export interface IDecoratorScanner {
    run(): void
}

//decorator
export enum MetadataKeys {
    isController = "controller",
    isMethod = "method",
    isPath = "path",
    isConstructor = "constructor",
    isParam = "param",
    isType = "design:type",
    isParamType = "design:paramtypes",
}

export type HttpRequestMethod =
    | "get"
    | "post"
    | "put"
    | "delete"
    | "put"
    | "patch"
    | "options"
    | "head"
    | "all"

export type ParamPosition = "query" | "body" | "headers" | "cookie" | "session"

export interface RouterMapping {
    route: string
    method: string
    fn: Function
    params: {
        param: string
        paramType: Function
        paramPosition: string
    }[]
    methodName: string
}
