import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { TripsContext } from "../../requests/useContext";
import { post_data } from "../../requests/useFetch";
import Cookies from "js-cookie";
import Test from "../../Test";
import TestMain from "../../TestMain";
import { createError } from "../../requests/createErrors";

const prices = (luxury, suv, sedan, hatchback, distance) => {
    const date = new Date();
    const hours = date.getHours();

    const luxury_price_per_km = 20;
    const suv_price_per_km = 17;
    const sedan_price_per_km = 15;
    const hatchback_price_per_km = 10;

    let luxury_price=0
    let suv_price=0
    let sedan_price=0
    let hatchback_price=0

    if(luxury === 0)  luxury_price = "No Rides Available"
    else if(distance<(2 * luxury)){
        luxury_price = luxury_price_per_km * distance
    }
    else{ 
        luxury_price = luxury_price_per_km* (distance-2*luxury)
    }


    if(suv === 0)  suv_price = "NaN"
    else if(distance<(2 * suv)) {suv_price = suv_price_per_km * distance}
    else {suv_price = suv_price_per_km * (distance-2*suv)}


    if(sedan === 0)  sedan_price = "NaN"
    else if(distance<(2 * sedan)) {sedan_price = sedan_price_per_km * distance}
    else {sedan_price = sedan_price_per_km * (distance-2*sedan)}

    if(hatchback === 0)  hatchback_price = "NaN"
    else if(distance<(2 * hatchback)) {hatchback_price = hatchback_price_per_km * distance}
    else hatchback_price = hatchback_price_per_km * distance * 0.75


    if(hours >= 6 && hours <= 20){
        // day time
        return [luxury_price, sedan_price,suv_price, hatchback_price]
    }
    else{
        // night time
        return [luxury_price*1.25, sedan_price*1.25,suv_price*1.25, hatchback_price*1.25]
    }
}



const Trips = () => {
    const [image, setImage] = React.useState('Primere-class-vehicle_clipdrop-background-removal 1.png');
    const [name, setName] = React.useState('Taxi Priemer');

    const [time, setTime] = React.useState('00:00');
    const [time_away, setTime_away] = React.useState('1');
    const [type, SetType] = React.useState('luxury');
    // const [price, setprice] = React.useState('0.000');

    const [time_hatch, setTime_hatch] = React.useState('10:00');
    const [time_away_hatch, setTime_away_hatch] = React.useState('1');
    const [price_hatch, setPrice_hatch] = React.useState('0.000');

    const [time_sedan, setTime_sedan] = React.useState('10:00');
    const [time_away_sedan, setTime_away_sedan] = React.useState('1');
    const [price_sedan, setPrice_sedan] = React.useState('0.000');

    const [time_SUV, setTime_SUV] = React.useState('10:00');
    const [time_away_SUV, setTime_away_SUV] = React.useState('1');
    const [price_SUV, setPrice_SUV] = React.useState('0.000');

    const [time_luxury, setTime_luxury] = React.useState('10:00');
    const [time_away_luxury, setTime_away_luxury] = React.useState('1');
    const [price_luxury, setPrice_luxury] = React.useState('0.000');

    const {main_data, setPrice, price, setDriver} = React.useContext(TripsContext);
    const navigate = useNavigate();

    const Client_ID = JSON.parse(Cookies.get("auth")).details.Client_ID
    const token = Cookies.get("serv_auth");

    const fun = (img, name, time, time_away, price) => {
        setImage(img);
        setName(name);
        setTime(time);
        setTime_away(time_away);
        setPrice(price);
    }
    const [loading, setloading] = React.useState(true);

    // for setting the prices
    const get_data_cars = async() => {
        let luxury = 0, sedan = 0, suv = 0, hatch = 0;

        console.log(main_data);
        const Source = main_data.Source.split(',')
        const Destination = main_data.Destination.split(',')

        const res = await post_data(`/Client/get_cars_nearby/${Client_ID}/${token}`, {
            curr_lat: Source[1], 
            curr_long: Source[0],
            distance: 2
        })


        for(let i=0;i<res.length;i++){
            if(res[i].Smart_Connect == 0 && res[i].Spread == "NORMAL" && res[i].Comfort_level == "LOW" && res[i].Road_Type == "HIGHWAY"){
                hatch += 1
            }
            else if(res[i].Smart_Connect == 1 && res[i].Spread == "LARGE" && res[i].Comfort_level == "MID" && res[i].Road_Type == "MOUNTAIN"){
                suv += 1
            }
            else if(res[i].Smart_Connect == 1 && res[i].Spread == "NORMAL" && res[i].Comfort_level == "MID" && res[i].Road_Type == "HIGHWAY"){
                sedan += 1;
            }
            else if(res[i].Smart_Connect == 1 && res[i].Spread == "NORMAL" && res[i].Comfort_level == "HIGH" && res[i].Road_Type == "HIGHWAY"){
                luxury += 1
            }
        }

        setloading(false);

        return {luxury, sedan, suv, hatch};
    }

    // for making the Trip_ID
    const create_Trip = async(Driver_ID, Start_lat, Start_long, End_lat, End_long, Amount, Distance) => {
        const res = await post_data(`/Trips/create/${Client_ID}/${token}`, {
            Driver_ID: Driver_ID,
            End_Lat: End_lat,
            End_Long : End_long, 
            Start_Lat: Start_lat, 
            Start_Long: Start_long, 
            Amount: Amount,  
            Distance_Trip: Distance});
    }

    // delete notification in notification table
    const delete_notification = async() => {
        
    }

    // for finding the prices
    const [price_changed, setPricechanged] = React.useState(false);
    const setPrices = () => {
        const {lux_cars, sedan_cars, suv_cars, hatch_cars} = get_data_cars();
        const distance = parseFloat(main_data.Distance.split('mi')[0])*1.60934;
        const d = prices(lux_cars, suv_cars, sedan_cars, hatch_cars, distance);
        if(d[0] === 'NaN'){
            setPrice_luxury("No Rides Available");
        }
        else{
            setPrice_luxury((d[0]*10).toFixed(3));
        }
        if(d[1] === 'NaN'){
            setPrice_sedan("No Rides Available");
        }
        else{
            setPrice_sedan((d[1]*10).toFixed(3));
        }
        if(d[2] === 'NaN'){
            setPrice_SUV("No Rides Available");
        }
        else{
            setPrice_SUV((d[2]*10).toFixed(3));
        }
        if(d[3] === 'NaN'){
            setPrice_hatch("No Rides Available");
        }
        else{
            setPrice_hatch((d[3]*10).toFixed(3));
        }
        setPrice(price_luxury)
        setPricechanged(true);
    }


    // for finding the drivers
    const [driver, SetDriver] = React.useState();
    const [firstDriver, SetfirstDriver] = React.useState(true);
    const [secondDriver, SetsecondDriver] = React.useState(false);
    const [thirdDriver, SetthirdDriver] = React.useState(false);
    const [start_search, setStart_search] = React.useState(false);

    const main_fun = async(data, index, Client_ID, token, drivers, Start_lat, Start_long, End_lat, End_long, distance) => {
        if(!((index === 1 && secondDriver === true) || (index === 2 && thirdDriver === true))){
            return;
        }

        // send the notification to the 2nd driver
        const {Driver_ID} = data[index]
        console.log(data[index]);
        let res = await post_data(`/Client/add_notification/${Client_ID}/${token}`, {
            Driver_ID: Driver_ID,
            Start_lat: Start_lat, 
            Start_long: Start_long, 
            End_lat: End_lat, 
            End_long: End_long,
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

    const finding_drivers = async(Start_lat, Start_long, End_lat, End_long, Distance) => {
        let res = await post_data(`/Client/get_driver_nearby_type/2/${Client_ID}/${token}`, {curr_lat: Start_lat, curr_long: Start_long});
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
                Start_lat: Start_lat, 
                Start_long: Start_long, 
                End_lat: End_lat, 
                End_long: End_long,
            })

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

                        clearInterval(interval1);
                    }
                    else{
                        console.log("No info gathered till now", 0);
                    }
                }, 2000)
            }
        }

        if(drivers >= 2){
            await main_fun(res, 1, Client_ID, token, drivers, Start_lat, Start_long, End_lat, End_long, Distance);
        }
        
        if(drivers >= 3){
            await main_fun(res, 2, Client_ID, token, drivers, Start_lat, Start_long, End_lat, End_long, Distance);
        }

        if(driver !== undefined){
            // formation of Trip_ID
            await create_Trip(driver, Start_lat, Start_long, End_lat, End_long, price, Distance);
            
            const confirm_ride = async() => {navigate("/Confirm_Ride", {state:{
                main_data : main_data,
                Amount: price
            }})
            window.location.reload()}
            await confirm_ride();
        }
    }

    useEffect( ()=> {
        if(price_changed === false){
            setPrices();
        }

        if(start_search === true){
            const Source = main_data.Source.split(',');
            const Destiantion = main_data.Destination.split(',');
            const distance = parseFloat(main_data.Distance.split('mi')[0])*1.60934;
            finding_drivers(Source[1], Source[0], Destiantion[1], Destiantion[0], price, distance);
        }

    }, [firstDriver, secondDriver, thirdDriver, driver, start_search])

    return(
        <>
        <Navbar/>
        <div className=" bg-black w-full h-fit p-1 z-100 absolute">
            <div className="bg-[#171426] w-full h-[67vh] rounded-3xl flex">
                {loading ? <img src="hands_waiting.gif" alt="" className=" h-full w-full opacity-[0.6] z-[200] absolute"/>: <></>}
                <div className="Car_Properties flex items-center justify-center w-[30vw] bg-[#171426] h-full rounded-tl-3xl rounded-bl-3xl p-2">
                    <div className="w-[100%] h-full">
                        <div className="h-1/2 mb-2 p-3">
                            <img src={image} alt="No image" className="w-[100%]"/>
                        </div>
                        <div className="text-white flex flex-col items-center justify-center h-[40%]">
                            <p className=" text-4xl mb-3">{name}</p>
                            <p className=" text-sm mb-5"> {time}. <span className="mx-2">{time_away} min Away</span></p>
                            <p className=" text-5xl">{price}</p>
                        </div>
                    </div>
                </div>
                <div className="w-[10px] flex items-center justify-center h-full">
                    <div className=" w-[1.5px] bg-white h-[80%]"></div>
                </div>
                <div className="flex flex-col items-center justify-between h-full w-[69vw] p-2">
                    <p className=" text-white text-xs">Choose a trip or swipe up</p>
                    <div className="h-[90%] w-full p-[2%] flex flex-col items-center justify-around">
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {
                            fun('hatchback-ev_clipdrop-background-removal 1.png', "Taxi Hatch", time_hatch, time_away_hatch, price_hatch)
                            SetType("Hatchback");
                            }}>
                            <div className="w-[20%] flex items-center justify-center">
                                <img src="hatchback-ev_clipdrop-background-removal 1.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Hatch</p>
                                <p className=" font-[mono] text-sm"> {time_hatch}. <span className="mx-1">{time_away_hatch} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_hatch}</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {
                            fun('3d-electric-car-charging-station_clipdrop-background-removal.png', "Taxi SUV", time_SUV, time_away_SUV, price_SUV)
                            SetType("SUV")
                            }}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="3d-electric-car-charging-station_clipdrop-background-removal.png" alt="" className="w-[70%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> SUV</p>
                                <p className=" font-[mono] text-sm"> {time_SUV}. <span className="mx-1">{time_away_SUV} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_SUV}</p>
                            </div>
                        </div>
                        <div className="w-[95%] bg-[#221D37] h-[23%] rounded-xl flex text-white" onClick={() => {
                            fun('Primere-class-vehicle_clipdrop-background-removal 1.png', "Taxi Priemer", time_luxury, time_away_luxury, price_luxury)
                            SetType("luxury");
                            }}>
                            <div className=" w-[20%] flex items-center justify-center">
                                <img src="Primere-class-vehicle_clipdrop-background-removal 1.png" alt="" className="w-[80%]"/>
                            </div>
                            <div className=" w-[65%] flex flex-col justify-around">
                                <p className=" text-xl h-[2%]">Taxi <span className="mx-1"> </span> Priemer</p>
                                <p className=" font-[mono] text-sm"> {time_luxury}. <span className="mx-1">{time_away_luxury} min Away</span></p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <p className="text-3xl">{price_luxury}</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center h-[20%] justify-center ">
                            <button className="w-[80%] h-[80%] bg-[#D90368] rounded-2xl text-white text-2xl" onClick={() => {

                                setloading(true);
                                setStart_search(true);

                                // if(loading === false){
                                //     navigate("/Confirm_Ride", {state:{
                                //         main_data : main_data,
                                //         Amount: price
                                //     }})
                                //     window.location.reload()
                                // }
                            }}>Confirm Ride</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Trips;