/**
 * @des 全局容器
 */
export class RootContainer {
    //controller
    private readonly controllerMap: Function[] = []
    //di
    protected readonly providerMap: WeakMap<Function, Function> = new WeakMap()
    //instance
    private readonly instanceMap: WeakMap<Function, Object> = new WeakMap()
    //config
    private configuration: Function = null

    public setConfiguration(key: Function) {
        this.configuration = key
    }
    public getConfiguration() {
        return this.configuration
    }
    public setController(key: Function) {
        if (!this.controllerMap.includes(key)) {
            this.controllerMap.push(key)
        }
    }
    public getControllerMap() {
        return this.controllerMap
    }
    public setProvider(key: Function, value: Function) {
        if (!this.providerMap.has(key)) {
            this.providerMap.set(key, value)
        }
    }
    public getProvider(key: Function) {
        return this.providerMap.get(key)
    }
    public setInstance(key: Function, value: Object) {
        if (!this.instanceMap.has(key)) {
            this.instanceMap.set(key, value)
        }
    }
    public getInstance(key: Function) {
        if (this.instanceMap.has(key)) {
            return this.instanceMap.get(key)
        }
        return null
    }
}
export const rootContainer = new RootContainer()
