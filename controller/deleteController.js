const Products = require('../model/productModel')

const deleteController = async (req, res) => {
    const id = req.params.id
    try {
        const deleteProduct = await Products.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" })
    }
}
module.exports = deleteController;