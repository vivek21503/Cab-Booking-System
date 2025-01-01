import React, { useEffect } from 'react';
import Trips from './Trips.jsx';
import Navbar from '../Navbar.jsx';
import { successLocation, errorLocation, setupMap, map, input_values, add_marker} from '../maps_file.js';
import "./maps_style.css"
import { Toast_Container, createError } from '../../requests/createErrors.js';
import { TripsContext } from '../../requests/useContext.js';


const MakeTrips = () => {
    const [show_trips, Set_show_trips] = React.useState(false);
    const [data, setData] = React.useState('');

    const {setMain_Data} = React.useContext(TripsContext);
    
    React.useEffect(() => {
        if(data) {
            // if data is string the show that please choose specific location
            if((data.Source[0] >= '0' && data.Source[0] <= '9') && (data.Destination[0] >= '0' && data.Destination[0] <= '9')){
                setMain_Data(data);
                Set_show_trips(true);
            }
            else{
                createError("Please specify a location near to the specified location") 
            }
        }
    }, [data])

    // here only we will create prices and pass the prices as props in Trips.jsx
    // here will be price prediction
    // const [loading, setloading] = React.useState(false);

    return(
        <>
        <div className='bg-black w-[100vw] h-[100vh]'>
            <Navbar/>
            {/* {loading ? <img src="hands_waiting.gif" alt="" className=" h-[100vh] w-[100vw] opacity-[0.5] z-[200] absolute"/>: <></>} */}
            <div className='flex items-center justify-center w-full h-full'>
                <div id='map' className="w-[98%] h-[70%] rounded-2xl fixed" 

                onClick={() => {setData(input_values())}} 
                onMouseLeave={() => {setData(input_values())}}></div>

            </div>

            {show_trips ? <Trips/> : ""}

            <Toast_Container/>
        </div>
        </>
    )
}

export default MakeTrips;