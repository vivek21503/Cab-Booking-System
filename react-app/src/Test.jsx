import React from "react";
import axios from "axios";
import { get_data, post_data } from "./requests/useFetch";
import Cookies from "js-cookie";
import { createError } from "./requests/createErrors";
import { ToastContainer } from "react-toastify";
import { TripsContext } from "./requests/useContext";

const Test = ({driver, SetDriver}) => {
    const [firstDriver, SetfirstDriver] = React.useState(true);
    const [secondDriver, SetsecondDriver] = React.useState(false);
    const [thirdDriver, SetthirdDriver] = React.useState(false);

    console.log("Inside this");

    // const [driver, SetDriver] = React.useState();

    const main_fun = async(data, index, Client_ID, token, drivers) => {
        if(!((index === 1 && secondDriver === true) || (index === 2 && thirdDriver === true))){
            return;
        }
        // send the notification to the 2nd driver
        const {Driver_ID} = data[index]
        console.log(data[index]);
        let res = await post_data(`/Client/add_notification/${Client_ID}/${token}`, {
            Driver_ID: Driver_ID,
            Start_lat: 0.00, 
            Start_long: 0.00, 
            End_lat: 0.00, 
            End_long: 0.00,
        })

        console.log(res);

        if(res === "Notification is Created Successfully"){
            console.log(res);
            const interval1 = setInterval(async() => {
                res = await post_data(`/Client/read_notification/${Client_ID}/${token}`, {
                    Driver_ID: Driver_ID,
                })

                const {Start_Lat, Start_Long, End_Lat, End_Long, Accept, Reject, Cancel} = res[0];
            
                if(Accept === 1){
                    console.log("Driver Accepted Successfully");
                    // here we have to make trip entry in trip table with status = pending
                    // we are setting driver here
                    SetDriver(Driver_ID);

                    // navigate to confirm ride


                    clearInterval(interval1);
                }
                else if(Reject === 1){
                    console.log("Driver rejected Success", index);
                    if(drivers >= 3){
                        SetthirdDriver(true);
                        SetsecondDriver(false);
                    }

                    clearInterval(interval1);
                }
                else if(Cancel === 1){
                    console.log("Cancel called");
                    res = await post_data(`/Client/cancel_trip/${Client_ID}/${token}`, {
                        Driver_ID: Driver_ID,
                        Cancel_Start_Lat: Start_Lat,
                        Cancel_Start_Long: Start_Long, 
                        Cancel_End_Lat: End_Lat, 
                        Cancel_End_Long: End_Long
                    })

                    clearInterval(interval1);
                }
                else{
                    console.log("No info gathered till now", index);
                }
            }, 2000)
        }
    }

    React.useEffect(() => {
        const fun = async() => {
            const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
            const token = Cookies.get("serv_auth");

            let res = await post_data(`/Client/get_driver_nearby_type/2/${Client_ID}/${token}`, {curr_lat: 28.57543, curr_long: 77.2732});
            console.log(res);
            let drivers = res.length;

            if(drivers === 0){
                createError("No Drivers Found Please try after some time");
                return
            }
            
            if(firstDriver === true){
                // send the notification to the 1st driver
                const {Driver_ID} = res[0]
                console.log(res[0]);
                res = await post_data(`/Client/add_notification/${Client_ID}/${token}`, {
                    Driver_ID: Driver_ID,
                    Start_lat: 0.00, 
                    Start_long: 0.00, 
                    End_lat: 0.00, 
                    End_long: 0.00,
                })

                console.log(res);

                if(res === "Notification is Created Successfully"){
                    console.log(res);
                    const interval1 = setInterval(async() => {
                        res = await post_data(`/Client/read_notification/${Client_ID}/${token}`, {
                            Driver_ID: Driver_ID,
                        })

                        const {Start_Lat, Start_Long, End_Lat, End_Long, Accept, Reject, Cancel} = res[0];
                    
                        if(Accept === 1){
                            console.log("Driver Accepted Successfully");
                            // here we have to make trip entry in trip table with status = pending
                            // we are setting driver here
                            SetDriver(Driver_ID);

                            // navigate to confirm ride


                            clearInterval(interval1);
                        }
                        else if(Reject === 1){
                            console.log("Driver rejected Success 0");
                            if(drivers >= 2){
                                SetsecondDriver(true);
                                SetfirstDriver(false);
                            }

                            clearInterval(interval1);
                        }
                        else if(Cancel === 1){
                            console.log("Cancel called");
                            res = await post_data(`/Client/cancel_trip/${Client_ID}/${token}`, {
                                Driver_ID: Driver_ID,
                                Cancel_Start_Lat: Start_Lat,
                                Cancel_Start_Long: Start_Long, 
                                Cancel_End_Lat: End_Lat, 
                                Cancel_End_Long: End_Long
                            })
                            
                            // here we need to make a cancelled trip or not ?????????????????????????????????????????????

                            clearInterval(interval1);
                        }
                        else{
                            console.log("No info gathered till now", 0);
                        }
                    }, 2000)
                }
            }

            if(drivers >= 2){
                await main_fun(res, 1, Client_ID, token, drivers);
                console.log("insode this");
            }
            
            if(drivers >= 3){
                await main_fun(res, 2, Client_ID, token, drivers);
                console.log("insode this");
            }

            if(driver !== undefined){
                console.log("We can navigate to route here");
            }

        }

        fun()
    }, [firstDriver, secondDriver, thirdDriver, driver])

    return(driver)
}

export default Test;