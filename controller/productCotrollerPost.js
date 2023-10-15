const Products = require('../model/productModel');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})

const productControllerPost = async (req, res) => {
    const { productName, catagory, price, description } = req.body;
    const productimage = req.file;
    try {
        if (!productName || !catagory || !productimage || !price) {
            return res.status(400).send({ msg: "Please fill all the required field" });
        } else {
            const uploadResult = await cloudinary.uploader.upload(productimage.path);
            const newProduct = new Products({
                productName,
                catagory,
                productimage: uploadResult.secure_url,
                price,
                description
            })
            newProduct.save();
            res.status(200).send({ msg: "Product added successfully" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal server error" });
    }
}
module.exports = productControllerPost;