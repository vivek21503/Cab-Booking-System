import React from "react";
import "./history.css"
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { get_data } from "../../requests/useFetch";


const History = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
    const token = Cookies.get("serv_auth");

    const successful = (Amount, ID, TimeStamp, status) => {
        const Trips_ID = ID;
        if(ID.length > 7){
            ID = ID.slice(0, 7);
        }
    
        if(status === "Successful"){
            return(
                <div className="inside1-history">
                    <img src="3d-electric-car-charging-station_clipdrop-background-removal.png" alt=""/>
                    <div>
                        <p className="date">Sun, Feb 12, 11:50 AM</p>
                        <div className="carid">
                            <p className="car">Car: Sedan</p>
                            <p className="tripid"> ID: 1234567</p>
                        </div>
                        <div className="carid">
                            <p>From: </p>
                            <p className="from"> E-152, Harkesh Nagar Okhla</p>
                        </div>
                        <div className="carid">
                            <p>To:</p>
                            <p className="to">Firoz Shah Kotla</p>
                        </div>
                    </div>
                    <div className="rsstatus">
                        <div className="rs">
                            <p>Rs. </p>  
                            <p className="price"> 2500</p>
                        </div>
                        <div className="successfull">
                            <p className="status"> Successfull</p>
                            <input type="submit" value="GIVE FEEDBACK" className="btn2"/>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="inside1-history">
                <img src="3d-electric-car-charging-station_clipdrop-background-removal.png" alt=""/>
                <div>
                    <p className="date">{TimeStamp}</p>
                    <div className="carid">
                        <p className="car">Car: Sedan</p>
                        <p className="tripid"> ID: {ID}</p>
                    </div>
                    <div className="carid">
                        <p>From:</p>
                        <p className="from">E-152, Harkesh Nagar Okhla</p>
                    </div>
                    <div className="carid">
                        <p>To:</p>
                        <p className="to">Firoz Shah Kotla</p>
                    </div>
                </div>
                <div className="rsstatus">
                    <div className="rs">
                        <p>Rs.</p>
                        <p className="price">{Amount}</p>
                    </div>
                    <div className="pending">
                        <p className="status" style={{color: 'grey', float: 'left'}}> Pending</p>
                        <br/>
                        <button className="btn" onClick={async() => {
                            setLoading(false);
                            await get_data(`/Client/pay_Driver/${Client_ID}/${token}/${Trips_ID}`);
                            await fun();
                        }}>Tap to Pay</button>
                    </div>
                </div>
            </div>
        )
    }
    
    const fun = async() => {

        const res = await get_data(`/Trips/getAll/${Client_ID}/${token}`)
        console.log(res);
        setData(res);

        setLoading(true);
    }

    React.useEffect(() => {
        fun()
    }, [])
    
    return(
        <>
            <Navbar/>
        
            <div className=" px-0 py-[20px] fixed">
            <h2>YOUR TRIPS</h2>
                <div className="inside-history">
                    {loading ? data.map((d) => { return(
                        successful(data[0].Amount, data[0].Trip_ID, data[0].TimeStamp_Pay.slice(0, 10), d.status_trips)
                    )}) : <img src="hands_waiting.gif" alt="" className="  w-[50%] opacity-[0.1] z-[200] ml-[25%] absolute"/>}
                </div>
            </div>
        </>
    )
}

export default History;