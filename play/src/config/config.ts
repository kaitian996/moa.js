import { IConfig, IConfiguration } from "@moa.js/core"
import { Configuration } from "@moa.js/decorator"

@Configuration()
export class Config implements IConfig {
    resolve(): IConfiguration {
        return {
            port: 3001,
        }
    }
}
