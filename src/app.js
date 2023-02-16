import express from "express"
import routes from "./routes"
import './database'

class App {
  constructor() {
    this.App = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.App.use(express.json())
  }

  routes() {
    this.App.use(routes)
  }
}

export default new App().App
