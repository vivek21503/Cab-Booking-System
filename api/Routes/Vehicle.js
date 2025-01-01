import Express from "express";
import { create_Vehicle, delete_Vehicle, get_Vehicle, get_Vehicle_all, update_registration, update_Vehicle } from "../Controllers/Vehicle_Controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = Express.Router();

router.post("/create/:ID", verifyUser, create_Vehicle);
router.post("update/:ID", verifyUser, update_Vehicle);
router.get("/getVehicle/:ID", verifyUser, get_Vehicle);
router.delete("delete/:ID", verifyUser, delete_Vehicle);

// admin
router.post("/update_registration/:ID", verifyAdmin, update_registration);
router.get("/get_All_Vehicles", verifyAdmin, get_Vehicle_all);

export default router;