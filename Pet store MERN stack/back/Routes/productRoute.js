import express from 'express';
import { addProduct } from '../controllers/ProductController.js';
import { upload } from '../middlewares/Upload.js';

const router = express.Router();

router.post('/add', upload.array("images", 20), addProduct);

export default router