import mongoose from "mongoose"
const cartSchema = new mongoose.Schema({
    buyerID: { type: String },
    productID: { type: String },
    quantity: { type: Number },
})

export default mongoose.model.cart||mongoose.model('cart',cartSchema)