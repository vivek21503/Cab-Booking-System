import Express from "express";
const router = Express.Router();
import db from "../index.js";

router.get("/driver_avg_rating", (req, res) => {
    const sql_query = `SELECT Driver_ID, avg(Trip_Rating) average_rating, max(Trip_Rating) as max_rating, min(Trip_Rating) as min_rating, sum(Amount) as Net_Income 
    from trips_table
    group by Driver_ID with rollup;`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error(err);
            }

            res.status(200).send(response)
        })
})
router.get("/transactions", (req, res) => {
    const sql_query = `SELECT year(TimeStamp_Pay) ,monthname(TimeStamp_Pay), count(Trip_ID), sum(amount) As Transaction_Per_Trip
    from trips_table
    group by year(TimeStamp_Pay), monthname(TimeStamp_Pay) with rollup;`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error(err);
            }

            res.status(200).send(response)
        })
})
router.get("/Client_locations_drivers", (req, res) => {
    const sql_query = `select Client_ID, Road_Type, count(Road_Type) as Number_of_Cars 
    from client_table , 
    (select Driver_ID from driver_table 
    natural join vehicle_table 
    intersect select Driver_ID from verification where Accepted_Drivers = true) As K 
    natural join Driver_Table 
    natural join vehicle_table As m
    where (C_Current_Location_lat - D_Current_Location_lat) * (C_Current_Location_lat - D_Current_Location_lat) + (C_Current_Location_long - D_Current_Location_long) * (C_Current_Location_long - D_Current_Location_long) <= 0.0009072144
    
    group by Client_ID, Road_Type with rollup;`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error(err);
            }

            res.status(200).send(response)
        })
})
router.get("/admin_driver_client", (req, res) => {
    const sql_query = `SELECT Admin_ID, Driver_ID, count(Client_ID) as Number_Of_Clients
    from manages_table
    group by Admin_ID, Driver_ID with rollup;`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error(err);
            }

            res.status(200).send(response)
        })
})

export default router;