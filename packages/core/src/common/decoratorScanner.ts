import { IApplicationContext, IDecoratorScanner } from "../interface"
import { readdirSync, statSync } from "fs"
import { join, resolve } from "path"
export class DecoratorScanner implements IDecoratorScanner {
    private scannerDir: string
    constructor(scannerDir: string) {
        this.scannerDir = scannerDir
    }
    private deepLoop(dir: string) {
        if (
            !statSync(dir).isDirectory() &&
            (/.ts/g.test(dir) || /.js/g.test(dir))
        ) {
            return require(dir.slice(0, -3))
        } else {
            readdirSync(dir).forEach((item) =>
                this.deepLoop(resolve(dir, item))
            )
        }
    }
    public run() {
        this.deepLoop(this.scannerDir)
    }
}
