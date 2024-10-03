import { Router } from "express";
import upload from "../config/MulterConfig";

import { getAllProducts } from "../controllers/productsControllers/getAllProducts";
import { addProduct } from "../controllers/productsControllers/addProduct";

const router = Router();


router.get('/get-all', getAllProducts);
router.post('/add', upload.single('image'), addProduct)


export default router;