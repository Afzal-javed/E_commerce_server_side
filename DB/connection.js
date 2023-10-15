const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connected to database")).catch((err) => console.log("Error", err))
