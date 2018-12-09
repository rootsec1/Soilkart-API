const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        store: { type: String, required: true },
        products: { type: [String], required: true, default: [] },
        status: { type: String, enum: [ 'WAIT', 'PICKEDUP', 'DELIVERED' ], default: 'WAIT' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('order', orderSchema);