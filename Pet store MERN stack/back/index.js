import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {PORT, mongoDBURL} from './config.js';
import router from './Routes/authRoute.js';
import userRouter from './Routes/userRoute.js';
import brandRouter from './Routes/brandRoute.js';
import productRouter from './Routes/productRoute.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { upload, __dirname } from './middlewares/Upload.js';


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('This is a site. It does nothing for now');
});

app.use('/', router);
app.use('/account', userRouter);
app.use('/brand', brandRouter);
app.use('/product', productRouter);


app.use('/back', express.static(path.join(__dirname, 'images')))

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to MongoDB!');
        app.listen(8080, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log(error);
    })



