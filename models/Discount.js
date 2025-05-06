const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
    product_id: {
        type: String,  
        required: true,
        unique: true  // Each product can have only one discount
    },
    discount: {
        type: Number,
        required: true
    }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
