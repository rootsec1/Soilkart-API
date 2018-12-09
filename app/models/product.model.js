const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        image: { type: String, required: false, default: '' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);