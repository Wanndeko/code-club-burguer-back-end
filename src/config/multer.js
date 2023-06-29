import multer from "multer";
import { v4 } from "uuid";
import {dirname, extname, resolve} from 'path'

const __dirname = resolve(dirname(''))

export default{
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..','..','uploads'),
        filename: (resquest, file, callback)=>{
            return callback(null, v4() + extname(file.originalname))
        }
    })

}