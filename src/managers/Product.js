//const fs = require('fs')
import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 201
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 200
        }
    }

    async addProduct({title, description, price, thumbnail, code, stock}) {
        try {
            let data = {title, description, price, thumbnail, code, stock}
            if (this.products.length > 0) {
                let next_id = this.products[this.products.length-1].id + 1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.products.push(data)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('created product: '+ data.id)
            return 201
        } catch(error) {
            console.log(error)
            return null
        }
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        return this.products.find(each=>each.id===id)
    }

    async updateProduct(id,data) {     
        try {
            let one = this.getProductById(id)
        
            for (let prop in data) {
                console.log(prop)
                console.log(data[prop])
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated user: '+id)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }

    async deleteProduct(id) {
        try {
            let one = this.products.find(each=>each.id===id)
            if (one) {
                this.products = this.products.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete product: '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }

}

let manager = new ProductManager('./data/data.json')

async function manage() {
    await manager.addProduct({ title:"cheeseburg", description:"solo queso", price:10, thumbnail:"foto cheese", code:"che", stock:4 })
    await manager.addProduct({ title:"doble cheese", description:"mucho queso", price:5, thumbnail:"foto doble cheese", code:"chs", stock:10 })
    await manager.addProduct({ title:"onion burger", description:"con cebolla", price:20, thumbnail:"foto onion", code:"oni", stock:8 })
    await manager.addProduct({ title:"american", description:"con tomate y lechuga", price:12, thumbnail:"foto american", code:"ame", stock:6 })
    await manager.updateProduct(1,{ title:"cheeseburger" })
    await manager.updateProduct(2,{title:"doble cheeseburger", stock:11})
    await manager.updateProduct(3,{})  
    await manager.deleteProduct(1)
    await manager.deleteProduct(130)
}
//manage()

export default manager