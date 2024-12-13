import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    cart_item: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'parentProduct' },
        item_count: Number,
        quantity: Number,
        cogs: Number,
    }],
    payment_at: Date,
});

const OrderModel = mongoose.model('order', OrderSchema);
export default OrderModel;
