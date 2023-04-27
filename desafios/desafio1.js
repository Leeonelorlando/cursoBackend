class ProductManager {
    constructor() {
        this.products = [];
    }

getProducts() {
    console.log(this.products)
    return this.products
}


addProduct({title, description, price, thumbnail, code, stock}) {
    let id = 0
    if (this.products.length === 0){
        id = 1
    }else {
        let lastProduct = this.products[this.products.length-1]
        id = lastProduct.id + 1
    }
    let product = {title, description, price, thumbnail, code, stock, id}
    this.products.push(product)
}

getProductById(product_id) {
    let one = this.products.find(each=> each.id === product_id)
    if (one) {
        console.log(one)
        return one
    }
    console.log('not found')
    return null
}
}

let producto = new ProductManager()

producto.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code:"abc123", stock: 25})
producto.addProduct({ title: "producto 2", description: "Este es un producto prueba", price: 100, thumbnail: "Sin imagen", code:"abc123", stock: 25})

console.log(producto)
//console.log(getProducts)

