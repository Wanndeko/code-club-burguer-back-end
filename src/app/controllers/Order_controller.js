import * as yup from 'yup'

import Products from '../models/Products'
import Categories from '../models/Categories'
import Order from '../schemas/Order'
import User from '../models/User'

class Order_controller {
    async store(request, response) {
        const schema = yup.object().shape({
            products: yup.array().required().of(
                yup.object().shape({
                    id: yup.number().required(),
                    quantity: yup.number().required(),
                })
            ),


        })
        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const products_id = request.body.products.map((product) => product.id)

        const update_product = await Products.findAll({
            where: {
                id: products_id,
            },
            include: [
                {
                    model: Categories,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const edited_product = update_product.map(product => {

            const product_index = request.body.products.findIndex(
                (request_product) => request_product.id === product.id)


            const new_product = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: request.body.products[product_index].quantity
            }

            return new_product
        })


        const order = {
            user: {
                id: request.user_id,
                name: request.user_name,
            },
            products: edited_product,
            status: 'Pedido realizado',
        }


        const order_reponse = await Order.create(order)

        return response.status(201).json(order_reponse)

    }

    async index(request, response) {

        const orders = await Order.find()

        return response.json(orders)
    }

    async update(request, response) {
        const schema = yup.object().shape({
            status: yup.string().required()
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

        const { id } = request.params
        const { status } = request.body

        try {
            await Order.updateOne({ _id: id }, { status })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }


        return response.json({ message: 'status was updated' })
    }
}

export default new Order_controller()

