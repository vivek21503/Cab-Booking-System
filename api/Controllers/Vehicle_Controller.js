import db from "../index.js";
import { createError } from "../utils/createError.js";

export const create_Vehicle = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {Vehicle_Name, Colour, RC_Number, Pollution_ID, Chasis_Number, Vehicle_Number} = req.body;

    const sql_query = `INSERT INTO Vehicle_Table 
    (Driver_ID, Vehicle_Name, Colour, RC_Number, Pollution_ID, Chasis_Number, Vehicle_Number) 
    VALUES (${Driver_ID}, ${Vehicle_Name}, ${Colour}, ${RC_Number}, ${Pollution_ID}, ${Chasis_Number}, ${Vehicle_Number});`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        res.status(200).send("Vehicle Created Successfully");
    })
}

export const update_Vehicle = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {Vehicle_Name, Colour, RC_Number, Pollution_ID, Chasis_Number, Vehicle_Number} = req.body;

    const sql_query = `UPDATE Vehicle_Table 
    SET Vehicle_Name = ${Vehicle_Name}, Colour = ${Colour}, RC_Number = ${RC_Number}, Pollution_ID = ${Pollution_ID}, Chasis_Number = ${Chasis_Number}, Vehicle_Number = ${Vehicle_Number} 
    WHERE Driver_ID = ${Driver_ID}`;


    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        res.status(200).send("Vehicle Updated Successfully");
    })
}

export const update_registration = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query = `UPDATE Vehicle_Table 
    SET is_registered = true WHERE Driver_ID = ${Driver_ID}`;


    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        res.status(200).send("Vehicle Registered Successfully");
    })
}

export const get_Vehicle = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT * FROM Vehicle_Table  
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }

        res.status(200).json(response);
    })
}
export const get_Vehicle_all = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT * FROM Vehicle_Table ;`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

export const delete_Vehicle = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query = `DELETE FROM Vehicle_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Vehicle Deleted Succesfully");
    })
}
