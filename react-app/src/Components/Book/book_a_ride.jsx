import React from "react";
import Navbar from "../Navbar";
import { successLocation, errorLocation, setupMap, map } from "../maps_file.js";
import {useNavigate} from "react-router-dom";
import { CustomerContext, TripsContext } from "../../requests/useContext";
import Cookies from "js-cookie";
import "./map_st.css"

const BookARide = () => {
    const {main_data} = React.useContext(TripsContext)
    console.log(main_data);
    const navigate = useNavigate();

    const {setlogin, setDetails, login, details} = React.useContext(CustomerContext);

    React.useEffect(() => {
        const value = Cookies.get('auth');
        
        if(value){
            setlogin(true);
            setDetails(JSON.parse(value))    
        }

    }, [])

    const verify = () => {
        if(login == true){
            navigate("/MakeTrips")
            window.location.reload()
        }
        else{
            navigate("/login")
        }
    }

    return(
        <div className="bg-black w-[100vw] h-[100vh]">
            <Navbar/>
            <div className="w-full h-[17%]"></div>
            <div className="px-40 w-full h-full bg-black">
                <div className=" w-full flex h-[30%]">
                    <div className="w-[40%] text-white">
                        <h1 className=" text-5xl mb-6">Book A Ride</h1>
                        <p>Lorem ipsum dolor sit amLorem ipsum dolor sit amet consectetur adipisicing elit. Ex ab commodi quas quasi doloribus eaque voluptate similique doloremque, veritatis, consequatur eos eum aspernatur blanditiis ullam?et consectetur adipisicing elit. Ex ab commodi quas quasi doloribus eaque voluptate similique doloremque, veritatis, consequatur eos eum aspernatur blanditiis ullam?</p>
                    </div>
                    <div className="w-[15%] flex flex-col items-center justify-center h-[100%] text-white">
                        <div className=" w-[1.5px] bg-white h-[40%]"></div>
                        <p>EV</p>
                        <div className=" w-[1.5px] bg-white h-[40%]"></div>
                    </div>
                    <div className="w-[45%] h-full flex justify-center items-center">
                            <button className="w-[65%] h-[80%] bg-[#FFD400] rounded-3xl text-white text-2xl" style={{backgroundImage: "linear-gradient(45deg,hsl(240deg 100% 20%) 0%,hsl(289deg 100% 21%) 11%,hsl(315deg 100% 27%) 22%,hsl(329deg 100% 36%) 33%,hsl(337deg 100% 43%) 44%,hsl(357deg 91% 59%) 56%,hsl(17deg 100% 59%) 67%,hsl(34deg 100% 53%) 78%,hsl(45deg 100% 50%) 89%,hsl(55deg 100% 50%) 100%)"}} onClick={() => {verify()}}>BOOK NOW</button>
                    </div>
                </div>

                <div className="w-full h-[33%]">
                    <img src="mzercedes-benz.png" alt="" className="w-full h-full"/>
                </div>

                <div className="w-full h-[35%] p-2">
                    <div id='map' className="w-full h-full rounded-3xl map-with-no-search" ></div>
                </div>
            </div>
        </div>
    )
}

// log hello world
export default BookARide;