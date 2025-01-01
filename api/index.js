import Express  from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()

import Trips_Router from "./Routes/Trips.js"
import Auth_Router from "./Routes/auth.js"
import ClientRouter from "./Routes/Client.js"
import Driver_Router from "./Routes/Driver.js"
import Vehicle_Router from "./Routes/Vehicle.js"
import Admin_Router from "./Routes/admin.js"

import OLAP from "./Routes/OLAP.js"

const app = new Express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'OmGarg8700@',
    database: 'TaxiWala'
  });

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected to database");
})


// ------------------- when in development mode   ---------
// app.use(Express.static("/folder_name"));
// --------------------------------------------------------

app.use(Express.json())
app.use(cookieParser())
app.use(cors())
app.use("/Trips", Trips_Router);
app.use("/auth", Auth_Router);
app.use("/Client", ClientRouter);
app.use("/Driver", Driver_Router);
app.use("/Vehicle", Vehicle_Router);
app.use("/Admin", Admin_Router);
app.use("/OLAP", OLAP);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
    res.json("Server designed by om garg")
})



// --------------------------------------- for testing purposes  --------------------------------------------------------------

app.get("/test_locations", (req, res) => {

    const sql_query = `select D_Current_Location_lat, D_Current_Location_long from 
    ((select Driver_ID from driver_table where (28.54741 - D_Current_Location_lat)*(28.54741 - D_Current_Location_lat)
     + (77.27340 - D_Current_Location_long) * (77.27340 - D_Current_Location_long) <= 2*0.015060*2*0.015060 and is_busy = false
    ) intersect select Driver_ID from verification where Accepted_Drivers = true) As T 
    natural join Driver_Table;`;


    db.query(sql_query, (err, response, feilds) => {
        if(err){
            return;
        }

        res.status(200).json(response);
    })
})




app.listen(8000, () => {
    console.log("Listening on port 8000");
})

export default db;