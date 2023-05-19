/**
 * @des 用来设置元数据
 */
import { rootContainer } from "../context/container"
import { MetadataKeys } from "../interface"
import "reflect-metadata"

export class Manager {
    static saveConfiguration(key: Function): void {
        rootContainer.setConfiguration(key)
    }
    static saveController(key: Function): void {
        rootContainer.setController(key)
    }
    static saveProvider(key: Function, value: Function): void {
        rootContainer.setProvider(key, value)
    }
    static getProvider(key: Function) {
        return rootContainer.getProvider(key)
    }
    static getInstance(key: Function) {
        return rootContainer.getInstance(key)
    }
    static setInstance(key: Function, value: Object) {
        rootContainer.setInstance(key, value)
    }
    static setMetadata(
        key: MetadataKeys,
        value: any,
        target: Object,
        propertyKey?: string
    ): void {
        if (propertyKey === undefined) {
            Reflect.defineMetadata(key, value, target)
        } else {
            Reflect.defineMetadata(key, value, target, propertyKey)
        }
    }
    static getMetadata(
        key: MetadataKeys,
        target: Object,
        propertyKey?: string
    ) {
        if (propertyKey === undefined) {
            return Reflect.getMetadata(key, target)
        } else {
            return Reflect.getMetadata(key, target, propertyKey)
        }
    }
    static defineProperty(
        target: Object,
        propertyKey: string,
        propertyValue: PropertyDescriptor
    ): void {
        Reflect.defineProperty(target, propertyKey, propertyValue)
    }
}
