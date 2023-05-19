import { Manager } from "../manager"

export const Configuration = (): ClassDecorator => {
    return (target) => {
        Manager.saveConfiguration(target)
    }
}
