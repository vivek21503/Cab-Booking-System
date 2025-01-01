import db from "../index.js";
import { createError } from "../utils/createError.js";

// accept and reject drivers
export const accept_driver = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query =  `UPDATE Vehicle_Table SET is_registered = true WHERE Driver_ID = ${Driver_ID};
    UPDATE Verification SET Processing_Application = false, Accepted_Drivers = true WHERE DRIVER_ID = ${Driver_ID};`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).send("Driver Updated Successfully")
    })
}

export const reject_driver = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query =  `UPDATE Verification 
    SET Processing_Application = false, Rejected_Drivers = true WHERE DRIVER_ID = ${Driver_ID};`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).send("Driver Updated Successfully")
    })
}

// drivers whose application under process
export const application_process = (req, res, next) => {
    const sql_query =  `SELECT Driver_ID 
    FROM Verification 
    WHERE Processing_Application = true;`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).json(response);
    })
}

// driver whose application is rejected
export const rejected_drivers = (req, res, next) => {
    const sql_query =  `SELECT Driver_ID 
    FROM Verification 
    WHERE Rejected_Drivers = true;`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).json(response);
    })
}

// drivers whose application is rejected and process under application
export const application_process_rejected = (req, res, next) => {
    const sql_query =  `SELECT Driver_ID 
    FROM Verification 
    WHERE Processing_Application = true AND Rejected_Drivers = true ;`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).json(response);
    })
}

export const get_all_harami_drivers = (req, res, next) => {
    const sql_query =  `select * from Driver_Table
    where Cancel_Email >= 5;`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).send(response)
    })
}






// ---------------_*********************Inportant_****************************----------------------
// when we are creating a driver we need to add to Verification table and set processing applicaiton to true and others to false
// if driver registers again the set application under process to true of registered driver

