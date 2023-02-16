import Sequelize  from "sequelize";

import data_base_config from '../config/database'
import User from '../app/models/User'

const models = [User]

class Database{
    constructor(){
        this.init()
    } 
    init(){
        this.connection = new Sequelize(data_base_config)
        models.map((model)=> model.init(this.connection))
    }


}

export default new Database()
