import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {PORT, mongoDBURL} from './config.js';
import router from './Routes/authRoute.js';
import userRouter from './Routes/userRoute.js'
import cookieParser from 'cookie-parser';

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



