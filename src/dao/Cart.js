import { model,Schema,Types } from 'mongoose'

let collection = 'carts'
let schema = new Schema({
    user_id: { type:Types.ObjectId,required:true,ref:'users',index:true },
    product_id: { type:Types.ObjectId,required:true,ref:'products' },
    quantity: { type:Number,required:true },
    active: { type:Boolean }
})

schema.pre(
    'find', //método de mongoose que cuando se utilice va a popular
    function() {
        this.populate('user_id','name -_id')
        this.populate('product_id','title -_id')
    }
)
let Cart = model(collection,schema)

export default Cart