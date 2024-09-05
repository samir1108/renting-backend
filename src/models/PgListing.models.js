import mongoose from 'mongoose';

const PGListingSchema = new mongoose.Schema({
    images: [String],
    pgName: { type: String, required: true },
    address: { type: String, required: true },
    monthlyCharge: { type: Number, required: true },
    electricity: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    pgType: { type: String, required: true },
    verified: { type: Boolean, required: true },
    filterAddressType: { type: String, required: true },
    contactNumber: [{ type: Number, required: true }] // Added contactNumber as an array of numbers
});

export default mongoose.model('PGListing', PGListingSchema);
