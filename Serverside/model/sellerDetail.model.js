import mongoose from "mongoose"
const sellerSchema = new mongoose.Schema({
    sellerID: { type: String },
    companyName: { type: String },
    place: { type: String },
    pincode: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
})

export default mongoose.model.sellerAddress||mongoose.model('sellerAddress',sellerSchema)