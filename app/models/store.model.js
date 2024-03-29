const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        fcm_token: { type: String, required: true },
        image: { type: String, required: false, default: '' },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        landmark: { type: String, required: false, default: '' }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('store', storeSchema);