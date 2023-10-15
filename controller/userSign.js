const Users = require('../model/user.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const profile = req.file;
        if (!fullName || !email || !password) {
            return res.status(400).send({ mes: "Please fill all required field" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const isUserAlreadyExist = await Users.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).send({ msg: 'User already exist' });
        } else {
            const newUser = new Users({
                fullName,
                email,
                password: hashedPassword
            });
            if (profile) {
                const uploadResult = await cloudinary.uploader.upload(profile.path);
                newUser.set('profile', uploadResult.secure_url);
            }
            newUser.save();
            return res.status(200).json({ newUser: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, profile: newUser.profile } })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}
module.exports = register;