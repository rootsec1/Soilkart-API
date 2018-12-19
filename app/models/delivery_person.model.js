const mongoose = require('mongoose');

const deliveryPersonSchema = mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('delivery_person', deliveryPersonSchema);