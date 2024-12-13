import mongoose from 'mongoose';

const VendorSchema = mongoose.Schema({
    name: String,
});

const VendorModel = mongoose.model('vendor', VendorSchema);
export default VendorModel;