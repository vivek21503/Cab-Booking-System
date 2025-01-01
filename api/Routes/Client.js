import Express from "express";
const router = Express.Router();
import { add_phone_Client, create_Client, create_Notification, create_cancelled_trip, delete_Client, drivers_nearby, drivers_nearby_type, get_Client, get_Client_all, get_cars_nearby, pay_driver, update_Client, update_Client_location } from "../Controllers/Client_Controller.js"; 
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {update_Cancel_Email } from "../Controllers/Driver_Controller.js";
import { read_Notification } from "../Controllers/Client_Controller.js";
import { update_trips } from "../Controllers/Trips_Controller.js";

router.post("/update/:ID/:access_token", verifyUser, update_Client);
router.post("/update_phones/:ID/:access_token", verifyUser, add_phone_Client);
router.post("/updateLocation/:ID/:access_token", verifyUser, update_Client_location);
router.get("/get/:ID/:access_token", verifyUser, get_Client);
router.post("/drivers_nearby/:ID/:access_token", verifyUser, drivers_nearby);
router.post("/get_cars_nearby/:ID/:access_token", verifyUser, get_cars_nearby);

// feedback
router.post("/feedback/:ID", verifyUser, update_trips)

// cancelled table
router.post("/cancel_trip/:ID/:access_token", verifyUser, create_cancelled_trip);
// router.post("/update_email", verifyUser, update_Cancel_Email)           // we can create a trigger of this

// Notification table
router.post("/add_notification/:ID/:access_token", verifyUser, create_Notification);
router.post("/read_notification/:ID/:access_token", verifyUser, read_Notification);

// for conformation of ride
router.post("/get_driver_nearby_type/:distance/:ID/:access_token", verifyUser, drivers_nearby_type);

// paying the driver
router.get("/pay_Driver/:ID/:access_token/:Trip_ID", verifyUser, pay_driver);

// admin
router.post("/create", verifyAdmin, create_Client);
router.delete("/delete/:ID", verifyAdmin, delete_Client);
router.get("/getAll/:ID", verifyAdmin, get_Client_all);

export default router;