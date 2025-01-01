import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../index.js";
import { createError } from "../utils/createError.js";

export const register = (req, res, next) => {
    const {person, FirstName, LastName, DOB, Email, Password} = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        const n_Password = bcrypt.hashSync(Password, salt);

        let sql_query = `select * from ( select D_Email, D_Password from Driver_Table 
            union select C_Email, C_Password from  client_table
            union select Admin_Email, Admin_Password from Admin_Table) As nrew
            where D_Email = '${Email}';`;

        db.query(sql_query, (err, response, feilds) => {
            if(err){
                return next(new Error("Error in Registration"));
            }

            if(response.length === 0){
                if(person === "Driver"){
                    sql_query = `INSERT INTO Driver_Table (D_First_Name, D_Last_Name, D_DOB, D_Email, D_Password) VALUES ("${FirstName}", "${LastName}", "${DOB}", "${Email}", "${n_Password}");`;
                }
                else if(person === "Client"){
                    sql_query = `INSERT INTO client_table (C_First_Name, C_Last_Name, C_DOB, C_Email, C_Password) VALUES ("${FirstName}", "${LastName}", "${DOB}", "${Email}", "${n_Password}");`;
                }
                else{
                    return next(createError(400, "Please enter as a client or driver"));
                }
        
                db.query(sql_query, (err, response, feilds) => {
                    if(err){
                        return next(new Error("Error in Registration"));
                    }
        
                    // console.log(response); here is metadata only 
                    res.status(200).send("User is Registered Successfully")
                })
            }
            else{
                return next(createError(400, "User already exsists"));
            }
        })

    } catch (error) {
        return next(error);
    }
}

export const login = async (req, res, next) => {
    const {person, Email, Password} = req.body;
    try {        
        let sql_query = "";
        if(person === "Driver"){
            sql_query = `SELECT * FROM Driver_Table 
            WHERE D_Email = "${Email}";`;
        }
        else if(person === "Client"){
            sql_query = `SELECT * FROM client_table 
            WHERE C_Email = "${Email}";`;
        }
        else{
            return next(createError(400, "Please enter as a client or driver"));
        }
        
        // Check in Client and Driver Database;
        db.query(sql_query, async (err, response, feilds) => {
            if(err){
                return next(createError(404, "User not found!"));
            }
            
            // check in admin table for making is_Admin = true;
            sql_query = `select * from Admin_Table where Admin_Email='${Email}';`;
            db.query(sql_query, async(err, admin_response, feilds) => {
                if(err){
                    return next(createError(404, "User not found!"));
                }
                
                var isAdmin = true;
                var user = {};
                
                if(admin_response[0] === undefined){
                    if(response[0] !== undefined){
                        user = response[0];
                        isAdmin = false;

                        if(person === "Client"){
                            const isPasswordCorrect = await bcrypt.compare(
                                Password,
                                user.C_Password
                            )

                            if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

                            const token = Jwt.sign(
                                { id: user.Client_ID, isAdmin: isAdmin},
                                process.env.JWT
                            );

                            let {C_Password, ...otherDetails } = user;

                            res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
                        }
                        else if(person === "Driver"){
                            const isPasswordCorrect = await bcrypt.compare(
                                Password,
                                user.D_Password
                            )

                            if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

                            const token = Jwt.sign(
                                { id: user.Driver_ID, isAdmin: isAdmin},
                                process.env.JWT
                            );

                            let {D_Password, ...otherDetails } = user;
                            
                            res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
                        }
                        else{
                            return next(createError(400, "Please enter as a client or driver"));
                        }
                    }
                    else{
                        return next(createError(400, "User not found : Error in Login details"))
                    }
                }
                else{
                    user = response[0];
                    isAdmin = true;

                    const isPasswordCorrect = await bcrypt.compare(
                        Password,
                        user.A_Password
                    );

                    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
                    
                    const {A_Password, ...otherDetails } = user;
            
                    res.status(200).json({ details: { ...otherDetails }, isAdmin });
                }
            })
        })
    } catch (error) {
        return next(error);
    }
}


// we have to  make one query such that it finds admin or client on one go


// we will use one query that we made to register -- union of drivers client and admin for searching only
// if not found then make a entry on respective searching of tables 

// just like same for login