import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    cart_item: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'parentProduct' },
        series: String,
        item_count: Number,
        quantity: Number,
        cogs: Number,
        price: Number,
        vendor_margin: Number,
        order_status: String
    }],
    payment_at: Date,
});

const OrderModel = mongoose.model('order', OrderSchema);
export default OrderModel;
