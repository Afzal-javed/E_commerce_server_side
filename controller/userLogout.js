const Users = require("../model/user");


const logout = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        } else {
            user.token = ''
            user.save();
            res.status(200).send({ msg: "Logout Successfully" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
}
module.exports = logout