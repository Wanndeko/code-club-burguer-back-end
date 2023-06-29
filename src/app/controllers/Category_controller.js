import * as Yup from 'yup'
import Category from '../models/Categories.js'
import User from '../models/User.js'

class Category_controller {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),

        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }


        const { admin: is_admin } = await User.findByPk(request.user_id)

        if (!is_admin) {
            return response.status(401).json()
        }


        const { name } = request.body
        const { filename: path } = request.file

        const categories_exists = await Category.findOne({
            where: {
                name,
            }
        })

        if (categories_exists) {
            return response.status(401).json({ error: "category already exists" })
        }

        const { id } = await Category.create({ name, path })


        return response.json({ id, name })


    }

    async index(request, response) {
        const categories = await Category.findAll()

        return response.json(categories)

    }

    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),

        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }


        const { admin: is_admin } = await User.findByPk(request.user_id)

        if (!is_admin) {
            return response.status(401).json()
        }


        const { name } = request.body

        const { id } = request.params

        const category = await Category.findByPk(id)

        if (!category) {
            return response.status(401).json({ error: "make sure your category is correct" })
        }

        let path
        if (request.file) {
            path = request.file.filename
        }

        await Category.update({ name, path },{where: {id}})


        return response.status(200).json()


    }


}

export default new Category_controller()