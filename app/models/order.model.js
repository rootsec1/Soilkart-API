const mongoose = require('mongoose');
const Product = require('./product.model');

const orderSchema = mongoose.Schema(
    {
        store: { type: String, required: true },
        products: { type: [Product.schema], required: true, default: [] },
        status: { type: String, enum: [ 'WAIT', 'PICKEDUP', 'DELIVERED' ], default: 'WAIT' },
        delivery_person: { type: String, required: false, default: null }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('order', orderSchema);