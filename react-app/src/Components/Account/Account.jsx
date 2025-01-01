import Navbar from "../Navbar";
import "./driver_profile.css"
import { CustomerContext } from "../../requests/useContext";
import React from "react";
import { get_data } from "../../requests/useFetch";
import { useLocation } from "react-router-dom";

const Account = () => {
    const {state} = useLocation();
    
    const Client_ID = state.details.Client_ID, Client_first = state.details.C_First_Name, Client_last = state.details.C_Last_Name, Client_Email = state.details.C_Email;

    return(
        <>
            <Navbar/>
            <div className="Account">
                <div className="heading">
                    <h1>Hi, {Client_first}!</h1>
                    <h2>Your Details</h2>
                </div>
                <div className="inside_profile">
                    <div className="left_profile">
                        <img src="om1.png" alt="driver picture" style={{width:'90%'}}/>
                        <br/>       
                        <button className="button button1" onClick={async() => {
                            await get_data(`/Driver/delete/:${Client_ID}`)
                            console.log("Driver Deleted Successfully");
                        }}>
                            DELETE ID
                        </button>
                    </div>
                    <div className="right_profile">
                        <div className="name">
                            <div className="firstname">
                                <p>First Name</p>
                                <h3>{Client_first}</h3>
                            </div>
                            <div className="lastname">
                                <p>Last Name</p>
                                <h3>{Client_last}</h3>
                            </div>
                        </div>
                        <div className="email">
                            <p>Email: </p>
                            <h3>{Client_Email}</h3>
                        </div>

                        <div className="phone">
                            <div className="email">
                                <p>Phone Number 1: </p>
                                <h3>9977674645</h3>
                            </div>
                            <div className="email">
                                <p>Phone Number 2: </p>
                                <h3>9977674645</h3>
                            </div>
                        </div>
                        <div className="email">
                            <p>Address:</p>
                            <h3> shaitan mahal, pareshan gali, jahnnum ke paas, 9211</h3>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account;