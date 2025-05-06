const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: 'User'
    },
    orders: [{
        orderNo: {
            type: String,
            required: true
        },
        products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            }
        }],
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered']
        },
        paymentMethod: {
            type: String,
            enum: ['cash on delivery', 'online transfer', 'payment gateway']
        },
        paymentReceipt: {
            type: String  // URL to uploaded receipt for online transfer
        },
        shippingStatus: {
            type: String,
            enum: ['dispatched', 'delivered']
        },
        address: {
            type: String,
            required: true
        }
    }]
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
