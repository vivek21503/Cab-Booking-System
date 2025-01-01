import Express from "express";
const router = Express.Router();
import { add_phone_Driver, create_Driver, delete_Driver, delete_Notification, get_Driver, get_Driver_all, get_Driver_location, is_Busy_update, read_Notification, update_Driver, update_Driver_location, update_Notification_Table } from "../Controllers/Driver_Controller.js"; 
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";


router.get("/update/:ID", verifyUser, update_Driver);
router.post("/update_phones/:ID", verifyUser, add_phone_Driver);
router.get("/updateLocation/:ID", verifyUser, update_Driver_location);
router.get("/driver_location/:ID", get_Driver_location);
router.get("/delete", delete_Driver);

// Notification Table
router.get("/Notifications/:ID", read_Notification)
router.get("/Notification_delete/:ID", verifyUser, delete_Notification)
router.post("/update_status", verifyUser, is_Busy_update);
router.post("/update_notification_table/:ID", update_Notification_Table)

router.post("/create", verifyAdmin, create_Driver);
router.delete("/delete/:ID", verifyAdmin, delete_Driver);
router.get("/getAll", verifyAdmin, get_Driver_all);
router.delete("/get/:ID", verifyAdmin, get_Driver);

export default router;