const fs = require('fs')

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
            return 'file created at path: '+this.path
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
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
            return 'product: '+ data.id
        } catch(error) {
            console.log(error)
            return 'addProduct: error'
        }
    }

    getProducts() {
        try{
            return this.products
        } catch(error) {
            console.log(error)
            return 'getProduct: error'
        }
    }

    getProductById(id) {
        let one = this.products.find(each=>each.id===id)
        if(!one) {
            console.log('getProductById: error')
            return null
        } else{
            console.log('finded product: ' + id)
            return one
        }
    }

    async updateProduct(id, data) {
        try {
            let one = this.getProductById(id)
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            if(Object.keys(data).length===0) {
                console.log('error: insert some product')
                return 'error: insert some product'
            }
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updatedProduct: '+ id)
            return 'updatedProduct: '+ id
        } catch(error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }

    async deleteProduct(id) {
        try {
            let one = this.getProductById(id)  
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: '+id)
            return 'deleteProduct: '+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }

}

async function manager() {
    let manager = new ProductManager('./data/data.json')
    await manager.addProduct({ title:"cheeseburg", description:"solo queso", price:10, thumbnail:"foto cheese", code:"che", stock:4 })
    await manager.addProduct({ title:"doble cheese", description:"mucho queso", price:5, thumbnail:"foto doble cheese", code:"chs", stock:10 })
    await manager.addProduct({ title:"onion burger", description:"con cebolla", price:20, thumbnail:"foto onion", code:"oni", stock:8 })
    await manager.addProduct({ title:"american", description:"con tomate y lechuga", price:12, thumbnail:"foto american", code:"ame", stock:6 })
    await manager.updateProduct(0,{ title:"cheeseburger" })
    await manager.updateProduct(1,{title:"doble cheeseburger", stock:11})
    await manager.updateProduct(2,{})  
    await manager.deleteProduct(1)
    await manager.deleteProduct(130)
}
manager()