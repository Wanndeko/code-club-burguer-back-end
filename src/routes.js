import { Router } from "express"

import Product_controller from "./app/controllers/Product_controller.js"
import Session_contollers from "./app/controllers/Session_contollers.js"
import User_controller from "./app/controllers/User_controller.js"
import Category_controller from "./app/controllers/Category_controller.js"
import Order_controller from "./app/controllers/Order_controller.js"

import multer from "multer"
import multer_config from "./config/multer.js"

import auth_middleware from "./app/middlewares/auth.js"

const upload = multer(multer_config)
const routes = new Router()


routes.post("/users", User_controller.store)
routes.post("/sessions", Session_contollers.store)

routes.use(auth_middleware)

routes.post("/products", upload.single('file'), Product_controller.store)
routes.get("/products", Product_controller.index)
routes.put("/products/:id", upload.single('file'), Product_controller.update)


routes.post("/categories", upload.single('file'), Category_controller.store)
routes.get("/categories", Category_controller.index)
routes.put("/categories/:id", upload.single('file'), Category_controller.update)

routes.post("/orders", Order_controller.store)
routes.put("/orders/:id", Order_controller.update)
routes.get("/orders", Order_controller.index)



export default routes
