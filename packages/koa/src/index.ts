import * as Koa from "koa"
import * as Router from "@koa/router"
import * as bodyParser from "koa-bodyparser"
export type koa = Koa
export type router = Router
export const createRouter = () => {
    return new Router()
}
export const createApplication = () => {
    const app: Koa = new Koa()
    app.use(bodyParser())
    return app
}
