import { Router } from "express"
import Product from "../dao/Product.js"
import auth from "../middlewares/auth.js"

const products_router = Router()

products_router.post(
    '/',
    async(req,res,next) => {
        try {
            let one = await Product.create(req.body)
            return res.status(201).json({
                success: true,
                message: `product id=${one._id} created`
            })
        } catch (error) {
            next(error)
        }
    }
)
products_router.get('/', auth, async(req,res,next)=> {
    let page = 1
    let limit = 5
    if (req.query.page > 0) { page = req.query.page }
    if (req.query.limit > 0) { limit = req.query.limit }
    try {
        let all = await Product.paginate({},{ limit,page })
        return res.status(200).json({ success: true, response: all })
    } catch (error) {
        next(error)
    }
})
products_router.get(
    '/query-stats',
    async(req,res,next) => {
        try {
            let quantity = await Product.find({ price: {$gt: 40} })
            let stats = await Product.find({ price: {$gt: 40} }).explain('executionStats')
            //console.log(stats)
            return res.status(200).json({
                success: true,
                quantity: quantity.length,
                time: stats.executionStats.executionTimeMillis
            })
        } catch (error) {
            next(error)
        }
    }
)
products_router.put(
    '/:id',
    async(req,res,next)=> {
        try {
            let one = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            if (one) {
                return res.status(200).json({
                    success: true,
                    data: one
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
products_router.delete(
    '/:id',
    async(req,res,next) => {
        try {
            let one = await Product.findByIdAndDelete(req.params.id)
            if (one) {
                return res.status(200).json({
                    success: true,
                    message: 'Product deleted!'
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'not found'                    
                })
            }
        } catch (error) {
            next(error)
        }
    }
)

export default products_router