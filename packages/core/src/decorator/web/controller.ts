import { MetadataKeys } from "../../interface"
import { Manager } from "../manager"

export const Controller = (rootPath: string): ClassDecorator => {
    return (target: Function) => {
        Manager.saveController(target)
        Manager.setMetadata(MetadataKeys.isController, rootPath, target)
    }
}
