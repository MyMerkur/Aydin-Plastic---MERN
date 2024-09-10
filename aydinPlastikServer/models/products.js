const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [String] 
});

module.exports = mongoose.model('Product', productSchema);
