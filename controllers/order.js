import OrderModel from "../models/OrderModel.js";
import { getMonthlySalesByVendor, getTotalSalesAndRevenueByProduct} from "../services/orderService.js";

export const getMonthlySalesByVendorController = async (req, res) => {
    const { vendorName } = await req.params;
    try {
        const salesData = await getMonthlySalesByVendor(vendorName);
        res.status(200).json(salesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTotalSalesAndRevenueByProductController = async (req, res) => {
    const { vendorName } = req.params;
    const { start, limit } = req.query;
    try {
        const { salesData, totalRecords } = await getTotalSalesAndRevenueByProduct(vendorName, parseInt(start), parseInt(limit));
        res.status(200).json({ products: salesData, totalRecords });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await OrderModel.findById(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addOrder = async (req, res) => {
    const order = req.body;
    const newOrder = new OrderModel({ ...order });
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id: _id } = req.params;
    const order = req.body;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(_id, { ...order, _id }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await OrderModel.findByIdAndRemove(id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};