import * as Yup from 'yup'
import Product from '../models/Products.js'
import Categories from '../models/Categories.js'
import User from '../models/User.js'
class Product_controller {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean()

        })

        const { admin: is_admin } = await User.findByPk(request.user_id)

        if (!is_admin) {
            return response.status(401).json()
        }


        const { filename: path } = request.file
        const { name, price, category_id, offer } = request.body

        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        return response.json(product)


    }

    async index(request, response) {
        const products = await Product.findAll({
            include: [
                {
                    model: Categories,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

        return response.json(products)

    }


    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean()

        })

        const { admin: is_admin } = await User.findByPk(request.user_id)

        if (!is_admin) {
            return response.status(401).json()
        }

        const { id } = request.params

        const product = await Product.findByPk(id)

        if (!product) {
            return response.status(401).json({ error: "make sure your product is correct" })
        }

        let path
        if (request.file) {
            path = request.file.filename
        }
        const { name, price, category_id, offer } = request.body

        await Product.update({
            name,
            price,
            category_id,
            path,
            offer
        },
        {
            where: {id}
        }
        
        )

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        return response.status(200).json()


    }
}


export default new Product_controller()