const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        store: { type: String, required: true },
        products: { type: [String], required: true, default: [] }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('order', orderSchema);