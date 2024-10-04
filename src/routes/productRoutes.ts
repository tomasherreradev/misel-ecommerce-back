import { Router } from "express";
import upload from "../config/MulterConfig";

import { getAllProducts } from "../controllers/productsControllers/getAllProducts";
import { getProductById } from "../controllers/productsControllers/getProductById";
import { addProduct } from "../controllers/productsControllers/addProduct";

const router = Router();


router.get('/get-all', getAllProducts);
router.get('/:id', getProductById)
router.post('/add', upload.single('image'), addProduct)


export default router;