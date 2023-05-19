import { IApplicationContext, IConfiguration, IModule } from "../interface"
export class ConfigurationModule implements IModule {
    public resolve(applicationContext: IApplicationContext): void {
        const configClass = applicationContext
            .getRootContainer()
            .getConfiguration()
        let config: IConfiguration
        if (configClass) {
            //@ts-ignore
            config = new configClass().resolve()
        } else {
            //default config
            config = {
                port: 3000,
            }
        }
        applicationContext.setConfiguration(config)
    }
}
