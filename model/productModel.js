const mongoose = require('mongoose');
const moment = require('moment-timezone');
const productScheema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    productimage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    timezone: {
        type: String,
        default: 'Asia/Kolkata'
    }
}, { timestamp: true })
moment.tz.setDefault('Asia/Kolkata');

const Products = mongoose.model('Product', productScheema);
module.exports = Products;
