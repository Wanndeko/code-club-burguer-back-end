import Sequelize from "sequelize";
import mongoose from "mongoose";

import data_base_config from '../config/database'
import User from '../app/models/User'
import Product from "../app/models/Products";
import Category from "../app/models/Categories";

const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }
    init() {
        this.connection = new Sequelize('postgresql://postgres:32T8lXv89vbJkXe8Ezh8@containers-us-west-134.railway.app:7656/railway')
        models
        .map((model) => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models))
    }

    mongo(){
        mongoose.set('strictQuery', false);
        this.mongo_connection = mongoose.connect(
            'mongodb://mongo:YD2okS5Z25Nr2DojEmQM@containers-us-west-209.railway.app:6937',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
    }


}

export default new Database()
