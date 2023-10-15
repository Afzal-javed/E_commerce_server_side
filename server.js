const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const register = require('./controller/userSign');
const login = require('./controller/userLogin');
const userRouter = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const deleteRouter = require('./routes/deleteRoute')
const productControllerPost = require('./controller/productCotrollerPost');
const updateController = require('./controller/updateController');

require('./DB/connection');

app.use(bodyParser.json({ limit: '10mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-for-food-delivery.netlify.app');
    // Other CORS headers as needed...
    next();
});
dotenv.config();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${extname}`);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image are allowed'), false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fieldSize: 1024 * 1024 * 5 }
})

app.get('/', (req, res) => {
    res.send("WelCome to server Side");
})

app.post('/api/user/register', upload.single('profile'), register);
app.post('/api/user/login', upload.single('profile'), login);
app.post('/api/product', upload.single('productimage'), productControllerPost);
app.patch('/api/update/:id', upload.single('productimage'), updateController);
app.use("/api/user", userRouter);
app.use("/api", productRoute);
app.use("/api/product", deleteRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})