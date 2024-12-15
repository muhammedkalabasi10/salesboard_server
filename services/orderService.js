import OrderModel from '../models/OrderModel.js';
import VendorModel from '../models/VendorModel.js';
import ParentProductModel from '../models/ParentProductModel.js';

export const getMonthlySalesByVendor = async (vendorName) => {
    try {
        const vendor = await VendorModel.findOne({ name: vendorName });
        if (!vendor) {
            throw new Error(`Vendor with name ${vendorName} not found`);
        }
        const salesData = await OrderModel.aggregate([
            {
                $unwind: "$cart_item"
            },
            {
                $lookup: {
                    from: "parentproducts",
                    localField: "cart_item.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $match: {
                    "productDetails.vendor": vendor._id
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$payment_at" },
                        month: { $month: "$payment_at" }
                    },
                    totalSales: { $sum: "$cart_item.quantity" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        return salesData;
    } catch (error) {
        console.error("Error fetching monthly sales by vendor:", error);
        throw error;
    }
};

export const getTotalSalesAndRevenueByProduct = async (vendorName, start, limit) => {
    try {
        // Toplam kayıt sayısını hesapla
        const totalRecords = await OrderModel.aggregate([
            {
                $unwind: '$cart_item',
            },
            {
                $lookup: {
                    from: ParentProductModel.collection.name,
                    localField: 'cart_item.product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $lookup: {
                    from: VendorModel.collection.name,
                    localField: 'productDetails.vendor',
                    foreignField: '_id',
                    as: 'vendorDetails',
                },
            },
            {
                $unwind: '$vendorDetails',
            },
            {
                $match: {
                    'vendorDetails.name': vendorName,
                },
            },
            {
                $group: {
                    _id: '$productDetails.name',
                },
            },
        ]).count('total');

        // Sayfalı veriyi al
        const salesData = await OrderModel.aggregate([
            {
                $unwind: '$cart_item',
            },
            {
                $lookup: {
                    from: ParentProductModel.collection.name,
                    localField: 'cart_item.product',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            {
                $unwind: '$productDetails',
            },
            {
                $lookup: {
                    from: VendorModel.collection.name,
                    localField: 'productDetails.vendor',
                    foreignField: '_id',
                    as: 'vendorDetails',
                },
            },
            {
                $unwind: '$vendorDetails',
            },
            {
                $match: {
                    'vendorDetails.name': vendorName,
                },
            },
            {
                $group: {
                    _id: '$productDetails.name',
                    totalQuantity: { $sum: '$cart_item.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$cart_item.quantity', '$cart_item.price'] } },
                },
            },
            {
                $project: {
                    _id: 0,
                    productName: '$_id',
                    totalQuantity: 1,
                    totalRevenue: 1,
                },
            },
            { $skip: start },
            { $limit: limit },
        ]);

        return { salesData, totalRecords: totalRecords[0]?.total || 0 };
    } catch (error) {
        console.error("Error while fetching sales data:", error);
        throw error;
    }
};
