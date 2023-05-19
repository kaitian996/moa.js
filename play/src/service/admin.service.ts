import { Controller, Get, Provider } from "@moa.js/decorator"

@Provider()
export class RootService {
    run() {
        console.log("provider working")
    }
}
