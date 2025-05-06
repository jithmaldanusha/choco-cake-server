const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNo: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            // ref: 'Product',
            // required: true
        },
        quantity: {
            type: String,
            // required: true
        },
        itemID: {
            type: String,
            // required: true
        },
        priceAfterDiscount: {
            type: String,
            // required: true
        },
        itemName: {
            type: String,
            // required: true
        },
        shortDescription: {
            type: String,
            // required: true
        },
        availability: {
            type: String,
            // required: true
        },

    }],
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    contactNumber: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: String,
        // required: true
    },
    nearestCity: {
        type: String
    },
    district: {
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['new-card', 'bank-transfer', 'cod'],
        // required: true
    },
    paymentReceipt: {
        type: String  // URL to the uploaded receipt for bank transfer
    },
    orderTotal: {
        type: String, // Total amount including delivery cost
        // required: true
    },
    itemCount: {
        type: String, // Number of items in the order
        // required: true
    },
    deliveryCost: {
        type: String // Cost of delivery
    },
    approved: {
        type: String,
        enum: ['approved', 'refused'],
        default: 'refused'
    },
    delivered: {
        type: String,
        enum: ['not delivered', 'delivered'],
        default: 'not delivered'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'refused'],
        default: 'pending'
    },
    timePlaced: {
        type: Date, // Timestamp when the order was placed
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
