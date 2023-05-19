import { MetadataKeys, ParamPosition } from "../../interface"
import { Manager } from "../manager"

const createParameterDecorator =
    (paramPosition: ParamPosition) =>
    (param: string = "*"): ParameterDecorator => {
        return (
            target: Object,
            propertyKey: string,
            parameterIndex: number
        ) => {
            const paramList: {
                param: string
                paramType: Function
                paramPosition: string
            }[] =
                Manager.getMetadata(
                    MetadataKeys.isParam,
                    target,
                    propertyKey
                ) || []

            const typeParameterList =
                Manager.getMetadata(
                    MetadataKeys.isParamType,
                    target,
                    propertyKey
                ) || []

            paramList.push({
                param,
                paramType: typeParameterList[parameterIndex],
                paramPosition,
            })

            Manager.setMetadata(
                MetadataKeys.isParam,
                paramList,
                target,
                propertyKey
            )
        }
    }

export const Query = createParameterDecorator("query")
export const Body = createParameterDecorator("body")
export const Headers = createParameterDecorator("headers")
export const Cookie = createParameterDecorator("cookie")
export const Session = createParameterDecorator("session")
