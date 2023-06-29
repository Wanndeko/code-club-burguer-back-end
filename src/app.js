import express from "express"
import routes from "./routes"
import './database'
import {resolve} from "path"
import cors from "cors"


class App {
  constructor() {
    this.App = express()
    this.App.use(cors())
    
    this.middlewares()
    this.routes()
    
  }

  middlewares() {
    this.App.use(express.json())
    this.App.use('/product-file',
      express.static(resolve(__dirname, '..', 'uploads'))
       )

       this.App.use('/category-file',
       express.static(resolve(__dirname, '..', 'uploads'))
        )
  }

  routes() {
    this.App.use(routes)
  }
}

export default new App().App
