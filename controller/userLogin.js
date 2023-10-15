const Users = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config()

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ msg: "Please fill all reguired field" });
        } else {
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).send({ msg: "User does not exist" });
            } else {
                const validateUser = await bcrypt.compare(password, user.password);
                if (!validateUser) {
                    return res.status(400).send({ msg: "Invalid credential" });
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email
                    }
                    const JWT = process.env.JWT_SECRET_KEY
                    jwt.sign(payload, JWT, { expiresIn: 84600 }, async (err, token) => {
                        await Users.updateOne({ _id: user._id }, {
                            $set: { token }
                        })
                        user.save();
                        return res.status(200).json({ user: { id: user._id, email: user.email, fullName: user.fullName, profile: user.profile }, token: token })
                    })
                }
            }
        }
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}
module.exports = login
