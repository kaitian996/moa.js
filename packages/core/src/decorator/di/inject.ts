import { MetadataKeys } from "../../interface"
import { Manager } from "../manager"

export const Inject = (): PropertyDecorator => {
    return (target: Object, propertyKey: string) => {
        const propertyType: Function = Manager.getMetadata(
            MetadataKeys.isType,
            target,
            propertyKey
        )
        let instance = Manager.getInstance(propertyType)
        if (!instance) {
            const providerClass = Manager.getProvider(propertyType)
            //@ts-ignore
            instance = new providerClass()
            Manager.setInstance(propertyType, instance)
        }
        Manager.defineProperty(target, propertyKey, {
            value: instance,
            configurable: true,
            writable: false,
        })
    }
}
