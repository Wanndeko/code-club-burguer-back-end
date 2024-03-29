import { v4 } from 'uuid'
import * as yup from 'yup'

import User from '../models/User.js'

class User_controller {
    async store(request, response) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required().min(6),
            admin: yup.boolean(),

        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name, email, password, admin } = request.body

        const user_exist = await User.findOne({
            where: {email}
        })

        if(user_exist){
            return response.status(409).json({error: "User already exists"})
        }
    
        console.log(user_exist)
        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        })

        return response.status(201).json({ id: user.id, name, email, admin })

    }
}

export default new User_controller()

