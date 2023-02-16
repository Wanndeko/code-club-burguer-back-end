import {Router} from "express"
import User_controller from "./app/controllers/User_controller"


const routes = new Router()

routes.post("/users", User_controller.store)


export default routes
