
import * as Yup from 'yup'
import User from '../models/User.js'
import Jwt from 'jsonwebtoken'
import auth_config from '../../config/auth.js'
class Sesscion_controller {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const user_email_or_password_incorrect = () => {
            return response
                .status(400)
                .json({ error: "email or password is not correct" })
        }

        if (!(await schema.isValid(request.body))) {
            user_email_or_password_incorrect()
        }

        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) { user_email_or_password_incorrect() }

        if (!(await user.check_password(password))) { user_email_or_password_incorrect() }



        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: Jwt.sign({ id: user.id, name: user.name }, auth_config.secret, {
                expiresIn: auth_config.expiresIn
            }),
        })


    }

}


export default new Sesscion_controller()
