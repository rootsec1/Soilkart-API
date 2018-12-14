const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true, enum: ['vegetables','fruits','grains'] },
        price: { type: Number, required: true },
        unit: { type: String, required: true },
        discount: { type: Number, required: false, default: 0 },
        image: { type: String, required: false, default: '' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('product', productSchema);