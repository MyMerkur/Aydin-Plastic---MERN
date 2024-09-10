const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true 
    },
  soyad: {
    type: String,
    required: true 
    },
  email: {
    type: String,
    required: true 
    },
  telefon: {
    type: String,
    required: true 
    },
  mesaj: {
    type: String,
    required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
