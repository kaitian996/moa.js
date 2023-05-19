import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Query,
} from "@moa.js/decorator"
import { RootService } from "../service/admin.service"

@Controller("/user-root")
export class User {
    @Inject()
    rootService: RootService
    @Get("/name")
    async getName(@Query("name") name: string) {
        this.rootService.run()
    }
    @Post("/postName")
    async postName(@Query("name") name: string, @Body() body: Object) {
        
    }
}
