import Express from "express";
const router = Express.Router();
import { create_trips, delete_trips, get_all_trips, get_trip, get_trips_Client, update_trips } from "../Controllers/Trips_Controller.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

router.post("/create/:ID/:access_token", verifyUser, create_trips);

router.post("/update", verifyUser, update_trips);


router.get("/get", verifyUser, get_trip);

router.get("/getAll/:ID/:access_token", verifyUser, get_trips_Client);

// admin
router.delete("/delete", verifyAdmin, delete_trips);
router.get("/get_All_Trips", verifyAdmin, get_all_trips);

export default router;
