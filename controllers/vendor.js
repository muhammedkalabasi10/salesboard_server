import VendorModel from "../models/VendorModel.js";

export const getVendors = async (req, res) => {
    try {
        const vendors = await VendorModel.find();
        res.status(200).json(vendors);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendor = await VendorModel.findById(id);
        res.status(200).json(vendor);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addVendor = async (req, res) => {
    const vendor = req.body;
    const newVendor = new VendorModel({ ...vendor });
    try {
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updateVendor = async (req, res) => {
    const { id: _id } = req.params;
    const vendor = req.body;
    try {
        const updatedVendor = await VendorModel.findByIdAndUpdate(_id, { ...vendor, _id }, { new: true });
        res.status(200).json(updatedVendor);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        await VendorModel.findByIdAndRemove(id);
        res.json({ message: "Vendor deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};
