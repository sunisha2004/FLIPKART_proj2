import mongoose from "mongoose"
const wishListSchema = new mongoose.Schema({
    buyerID: { type: String },
    productID: { type: String },
})

export default mongoose.model.wishList||mongoose.model('wishList',wishListSchema)