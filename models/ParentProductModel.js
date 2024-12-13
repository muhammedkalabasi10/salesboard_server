import mongoose from 'mongoose';

const ParentProductSchema = mongoose.Schema({
    name: String,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendor' },
});

const ParentProductModel = mongoose.model('parentProduct', ParentProductSchema);
export default ParentProductModel;
