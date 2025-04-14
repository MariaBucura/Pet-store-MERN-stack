import express from "express";
import { addBrand, getBrands } from "../controllers/BrandController.js";
import { upload } from "../middlewares/Upload.js";

const router = express.Router();

router.post('/add', upload.single("image"), addBrand);
router.get('/all', getBrands);

export default router