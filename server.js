import express from 'express'
import manager from './desafios/desafio2.js'

let server = express()

let PORT = 8080
let ready = ()=>console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req,res)=> {
    let quantity = manager.getProducts().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
server.get(index_route,index_function)

let one_route = '/products/:id'
let one_function = (request,response)=> {
    let parametros = request.params
    let id = Number(parametros.id)
    //console.log(id)
    //console.log(typeof id)
    let one = manager.getProducts(id)
    console.log(one)
    if (one) {
        return response.send({
            success: true,
            product: one
        })
    } else {
        return response.send({
            success: false,
            product: 'not found'
        })
    }
    
}
server.get(one_route,one_function)

let query_route = '/products'
let query_function = (req,res)=> {
    console.log(req.query)
    let quantity = req.query.quantity ?? 5
/*     if (req.query.quantity) {
    } */
    let products = manager.getProducts().slice(0,quantity) //array de usuarios que tengo que REBANAR para que se pagine según la query que envía el cliente
    if (products.length>0) {
        return res.send({
            success: true,
            products
        })
    } else {
        return res.send({
            success: false,
            products: 'not found'
        })
    }    
}
server.get(query_route,query_function)