import ParentProductModel from "../models/ParentProductModel.js";

export const getParentProducts = async (req, res) => {
    try {
        const parentProducts = await ParentProductModel.find();
        res.status(200).json(parentProducts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getParentProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const parentProduct = await ParentProductModel.findById(id);
        res.status(200).json(parentProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addParentProduct = async (req, res) => {
    const parentProduct = req.body;
    const newParentProduct = new ParentProductModel({ ...parentProduct });
    try {
        await newParentProduct.save();
        res.status(201).json(newParentProduct);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updateParentProduct = async (req, res) => {
    const { id: _id } = req.params;
    const parentProduct = req.body;
    try {
        const updatedParentProduct = await ParentProductModel.findByIdAndUpdate(_id, { ...parentProduct, _id }, { new: true });
        res.status(200).json(updatedParentProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
};

export const deleteParentProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await ParentProductModel.findByIdAndRemove(id);
        res.json({ message: "ParentProduct deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};
