import React, { Component } from "react";
import { get_data, post_data } from "./requests/useFetch";
import Cookies from "js-cookie";

const TestMain = () => {
    const [data, Setdata] = React.useState();
    const [showTrips, Setshowtrips] = React.useState(false);

    const fun = async() => {
        const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
        const token = Cookies.get("serv_auth");

        // const res = await post_data(`/Trips/create/${Client_ID}/${token}`, {
        //     Driver_ID: 1,
        //     End_Lat: 0.00,
        //     End_Long : 0.00, 
        //     Start_Lat: 0.00, 
        //     Start_Long: 0.00, 
        //     Amount: 450,  
        //     Distance_Trip: 34.034});

        const res = await get_data(`/Trips/getAll/${Client_ID}/${token}`)
        console.log(res);
        Setdata(res);
        Setshowtrips(true)

        // if it is getting the error then remove the React Strict Mode
    }

    // It runs after the component is rendered.
    React.useEffect(() => {
        fun()
    }, [])

    return(
        <>
        {showTrips ? <>{data.map((d, index) => {
        return(<p key={index}>{d.Trip_ID}</p>)})}
        </> : <></>}

        </>
    )
}

// Important things to learn : 
// use Effect runs after Component is rendered completely =-- Important


export default TestMain;