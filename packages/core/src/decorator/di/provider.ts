import { Manager } from "../manager"

export const Provider = (): ClassDecorator => {
    return (target: Function) => {
        Manager.saveProvider(target, target)
    }
}
