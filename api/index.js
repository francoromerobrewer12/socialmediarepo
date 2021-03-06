const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require('multer')
const path = require('path');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true},() => {
    console.log("Connected to Social Media database!")
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

//subir foto en el post usando multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req,res) => {
    try{
        return res.status(200).json("File uploaded successfully!")
    } catch(err) {
        console.log(err);
    }
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


app.listen(PORT, () => {
    console.log("Backend server is running!")
})
