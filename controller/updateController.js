const Products = require('../model/productModel');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})
const updateController = async (req, res) => {
    try {
        const productId = req.params.id
        const { productName, catagory, price, description } = req.body;
        const productimage = req.file;
        if (productimage) {
            const uploadResult = await cloudinary.uploader.upload(productimage.path);
            const updateField = {
                productName,
                catagory,
                price,
                productimage: uploadResult.secure_url,
                description
            }
            const updateProduct = await Products.findByIdAndUpdate(productId, updateField, { new: true })
            res.status(200).json(updateProduct);
        } else {
            const updateField = {
                productName,
                catagory,
                price,
                description
            }
            const updateProduct = await Products.findByIdAndUpdate(productId, updateField, { new: true })
            res.status(200).json(updateProduct);
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal server error" });
    }

}
module.exports = updateController