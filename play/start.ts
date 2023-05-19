import { setupGlobalApplicationContext } from "@moa.js/core"
import { resolve } from "path"
const app = setupGlobalApplicationContext({
    appDir: resolve(process.cwd(), "src"),
    baseDir: resolve(process.cwd(), "src"),
})
console.log(app);
app.run()
