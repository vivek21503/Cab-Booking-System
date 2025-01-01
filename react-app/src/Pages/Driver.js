import {useState, useEffect} from "react"
import axios from "axios";
import { get_data, post_data } from "../requests/useFetch";
import { ToastContainer } from "react-toastify";
import { createError } from "../requests/createErrors";
import Cookies from "js-cookie";

const Driver = () => {
    const [notifications, setNotifications] = useState();
    const [show_noti, setShow_noti] = useState(false);
    const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
    const token = Cookies.get("serv_auth");
    const Driver_ID = 1;

    useEffect(() => {
        const fun = async() => {
            const res = await get_data(`/Driver/Notifications/${Driver_ID}`)
            if(res === undefined){
                return createError("Error in getting the data from the server")
            }
            return setNotifications(res);
        }
        fun()
    }, [])

    const accept_notification = async() => {
        // update the notification table to Accept = true

        const ress = await post_data(`/Driver/update_notification_table/${Driver_ID}`, {
            attribute: "Accepted"
        })

        console.log("Notification is accepted");
    }

    const decline_notification = async() => {
        await post_data(`/Driver/update_notification_table/${Driver_ID}`, {
            attribute: "Rejected"
        })

        console.log("Notification is accepted");
    }
    const cancel_notification = async() => {
        await post_data(`/Driver/update_notification_table/${Driver_ID}`, {
            attribute: "Rejected"
        })

        console.log("Notification is accepted");
    }

    return(
        <>
        <button onClick={() => {
            console.log(notifications);
            setShow_noti(true)
        }}>Get Notifications</button>

        {show_noti ? <>
            <h1>Notifications</h1>
            {(notifications !== undefined) ? <>
            <button onClick={() => {accept_notification()}}>Accept</button>
            <button onClick={() => {decline_notification()}}>Delete</button>
            <button onClick={() => {cancel_notification()}}>Cancel</button></> : <></>}
        </> : <></>}
        <ToastContainer/>
        </>
    )
}

export default Driver;