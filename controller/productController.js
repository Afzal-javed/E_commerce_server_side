const Products = require('../model/productModel');
const productControllerGet = async (req, res) => {
    try {
        const productData = await Products.find({});
        const allProducts = await productData.map((product) => {
            return { products: { id: product._id, productName: product.productName, catagory: product.catagory, productimage: product.productimage, price: product.price, description: product.description } }
        })
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).send({ msg: "Failed to fetch all products" });
    }
}
module.exports = productControllerGet;