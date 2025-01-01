import db from "../index.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

export const create_Driver = (req, res, next) => {
    const {FirstName, LastName, DOB, Email, Password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `INSERT INTO Driver_Table (D_First_Name, D_Last_Name, D_DOB, D_Email, D_Password) VALUES (${FirstName}, ${LastName}, ${DOB}, ${Email}, ${Password});`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Creating a Driver");
            }

            console.log(response);
            res.status(200).send("User is Created Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Driver = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {FirstName, LastName, DOB, Email, Password} = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);

        const sql_query = `UPDATE Driver_Table 
        SET D_First_Name = ${FirstName}, D_Last_Name = ${LastName}, D_DOB = ${DOB}, D_Email = ${Email}, D_Password = ${Password} 
        WHERE Driver_ID = ${Driver_ID}`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                throw new Error("Error in Updating a Driver");
            }

            console.log(response);
            res.status(200).send("User Updated Successfully")
        })
        
    } catch (error) {
        return next(error);
    }
}

export const update_Driver_location = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {Current_lat, Current_long} = req.body;

    const sql_query = `UPDATE Driver_Table 
    SET D_Current_Location_lat = ${Current_lat}, D_Current_Location_long = ${Current_long} 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Location Updated Succesfully");
    })
}

export const delete_Driver = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `DELETE FROM Driver_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Driver Deleted Succesfully");
    })
}

export const get_Driver = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT * FROM Driver_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }

        res.status(200).json(response);
    })
}
export const get_Driver_all = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT * FROM Driver_Table
    WHERE Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

export const get_Driver_location = (req, res, next)=>{
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT D_Current_Location_lat, D_Current_Location_long FROM Driver_Table
    WHERE Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })
}

export const add_phone_Driver = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {phones} = req.body;

    const sql_query = `SELECT * FROM Driver_Table
    WHERE Driver_ID = ${Driver_ID}; `;
    for(let i=0;i<phones.length;i++){
        sql_query += `INSERT INTO Driver_Phones VALUES(${Driver_ID}, ${phones[i]}); \n`
    }

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Phones inserted successfully");
    })
}


export const is_Busy_update = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {set_to} = req.body;

    const sql_query = `UPDATE Driver_Table 
    SET is_Busy = ${set_to} 
    WHERE Driver_ID = ${Driver_ID}; `;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).send("Driver Updated successfully");
    })
}

// location updations and creations
export const create_Driver_locations = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {Current_lat, Current_long} = req.body;

    const sql_query = `INSERT INTO Driver_Locations (Driver_ID, latitude, longitude) 
    VALUES (${Driver_ID}, ${Current_lat}, ${Current_long});`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Locations Updated Succesfully");
    })
}

// by admin only
export const get_all_driver_locations = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query = `select * from Driver_Locations 
    where Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }

        res.status(200).send(response);
    })
}

// update Notifications Table
export const update_Notification_Table = (req, res, next) => {
    const Driver_ID = req.params.ID;
    const {attribute} = req.body;

    let sql_query = ``;

    if(attribute === "Accepted"){
        sql_query = `update Notification_Table 
        set Accept = true 
        where Driver_ID = ${Driver_ID};`;
    }
    else if(attribute === "Rejected"){
        sql_query = `update Notifications_Table 
        set Reject = true 
        where Driver_ID = ${Driver_ID};`;
    }
    else if(attribute === "Cancelled"){
        sql_query = `update Notifications_Table 
        set Cancel = true 
        where Driver_ID = ${Driver_ID};`;
    }

    if(sql_query !== ""){
        db.query(sql_query, (err, response, feilds) => {
            if(err){
                next(createError(404, "Page not found"));
                return;
            }
    
            res.status(200).send("Notification Table updated Successfully");
        })
    }

}

export const update_Cancel_Email = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query =  `UPDATE Verification 
    SET Cancel_Email = Cancel_Email + 1 
    WHERE DRIVER_ID = ${Driver_ID};`

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, err));
        }

        res.status(200).send("Driver Updated Successfully")
    })
}

// Notification Table   --     It is for driver only
export const read_Notification = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query = `SELECT * FROM Notification_Table
    WHERE Driver_ID = ${Driver_ID};`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            res.status(404).send("Page not found");
            return;
        }

        res.status(200).json(response);
    })    
}
export const delete_Notification = (req, res, next) => {
    const Driver_ID = req.params.ID;

    const sql_query = `DELETE FROM Notification_Table 
    WHERE Driver_ID = ${Driver_ID}`;

    db.query(sql_query, (err, response, feilds) => {
        if(err){
            next(createError(404, "Page not found"));
            return;
        }
        console.log(response);
        res.status(200).send("Notification Deleted Succesfully");
    })
}
