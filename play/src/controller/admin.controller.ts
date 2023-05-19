import {
    Body,
    Controller,
    Get,
    Head,
    Headers,
    Inject,
    Post,
    Query,
} from "@moa.js/decorator"
import { RootService } from "../service/admin.service"

@Controller("/root")
export class RootController {
    @Inject()
    rootService: RootService
    @Get("/getName")
    async getName(@Query("name") name: string) {
        return name
    }
    @Post("/postName")
    async postName(
        @Query("name") name1: string,
        @Body("name") name2: string,
        @Headers("name") name3: string
    ) {
        return {
            name1,
            name2,
            name3,
        }
    }
}
