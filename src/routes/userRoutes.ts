import { Router } from "express";
import { createUser } from "../controllers/userControllers/createUser";
import { confirmAccount } from "../controllers/userControllers/confirmAcount";
import { loginUser } from "../controllers/userControllers/loginUser";


const router = Router();


router.post('/add', createUser);
router.post('/confirm/:token', confirmAccount);
router.post('/login', loginUser);


export default router;