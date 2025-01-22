import mongoose from "mongoose"
const buyerOrderSchema = new mongoose.Schema({
    buyerID: { type: String },
    productID: { type: String },
    quantity: { type: Number },
    confirm: { type: Boolean },
})

export default mongoose.model.buyerOrder||mongoose.model('buyerOrder',buyerOrderSchema)