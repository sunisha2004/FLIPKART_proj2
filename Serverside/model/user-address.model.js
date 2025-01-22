import mongoose from "mongoose"
const addressSchema = new mongoose.Schema({
    userID: { type: String },
    city: { type: String },
    pincode: { type: String },
    district: { type: String },
    country: { type: String },
})

export default mongoose.model.userAddress||mongoose.model('userAddress',addressSchema)