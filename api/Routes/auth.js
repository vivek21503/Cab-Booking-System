import Express from "express";
const router = Express.Router();
import { login, register } from "../Controllers/auth_Controller.js";


router.post("/register", register);
router.post("/login", login);

export default router;