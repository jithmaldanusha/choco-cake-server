const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        name: {
            type: String
        },
        phone: {
            type: String
        }
    },
    // products: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product'
    // }],
    // lowStockNotifications: [{
    //     productId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Product'
    //     },
    //     productName: {
    //         type: String
    //     },
    //     currentStock: {
    //         type: Number
    //     }
    // }],
    // invoices: [{
    //     orderId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Order'
    //     },
    //     invoiceURL: {
    //         type: String
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }],
    // notifications: [{
    //     type: {
    //         type: String
    //     },
    //     message: {
    //         type: String
    //     }
    // }]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
