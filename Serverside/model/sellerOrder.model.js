import mongoose from "mongoose"
const sellerOrderSchema = new mongoose.Schema({
    sellerID: { type: String },
    buyerID: { type: String },
    productID: { type: String },
    quantity: {type:Number},
    address: { type: String },
    confirm: { type: Boolean },
})

export default mongoose.model.sellerOrder||mongoose.model('sellerOrder',sellerOrderSchema)