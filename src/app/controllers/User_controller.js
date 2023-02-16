import { v4 } from 'uuid'
import * as yup from 'yup'

import User from '../models/User'

class User_controller {
    async store(request, response) {
        const { name, email, password_hash, admin } = request.body
        const schema = yup.object().shape({
            name:yup.string().required(),
            email:yup.string().email().required(),
            password_hash:yup.string().required().min(6),
            admin:yup.boolean(),

        })

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        })

        return response.status(201).json({id:user.id, name, email, admin})

    }
}

export default new User_controller()

