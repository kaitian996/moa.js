import { HttpRequestMethod, MetadataKeys } from "../../interface"
import { Manager } from "../manager"

const createMappingDecorator =
    (method: HttpRequestMethod) =>
    (path: string): MethodDecorator => {
        return (target: Object, propertyKey: string, descriptor) => {
            Manager.setMetadata(MetadataKeys.isMethod, method, descriptor.value)
            Manager.setMetadata(MetadataKeys.isPath, path, descriptor.value)
        }
    }

export const Get = createMappingDecorator("get")
export const Post = createMappingDecorator("post")
export const Delete = createMappingDecorator("delete")
export const Put = createMappingDecorator("put")
export const Patch = createMappingDecorator("patch")
export const Options = createMappingDecorator("options")
export const Head = createMappingDecorator("head")
export const All = createMappingDecorator("all")
