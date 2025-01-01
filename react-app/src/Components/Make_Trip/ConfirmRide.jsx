import React from "react";
import {TripsContext} from "../../requests/useContext.js"
import axios from "axios";
import Navbar from "../Navbar.jsx";
import mapboxgl from "mapbox-gl";
import { get_data } from "../../requests/useFetch.js";
import { useLocation } from "react-router-dom";


// here we are creating our map for lines and driving of vehicle
const main_function = async(routes_data, source, destination, ID) => {
    mapboxgl.accessToken =
  "pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ"

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
    })

    function successLocation(position) {
        setupMap([position.coords.longitude, position.coords.latitude])
    }
    
    function errorLocation() {
        setupMap([-2.24, 53.48])
    }

    let map = ""
    const setupMap = (center) => {
        map = new mapboxgl.Map({
          container: "map1",
          style: "mapbox://styles/mapbox/streets-v11",
          center: center,
          zoom: 13,
        })
        
        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                'type': 'LineString',
                'coordinates': routes_data
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': '#000000',
                'line-width': 5
                }
            });
        });
    
    
        var el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = '#0096FF'
          el.style.width = '15px';
          el.style.height = '15px';
          el.style.borderRadius = '25px';
          
          new mapboxgl.Marker(el)
          .setLngLat(center)
          .addTo(map);

        
        var driver = document.createElement('img');
        driver.className = 'driver_car';
        driver.style.width = '40px';
        driver.style.height = '23px';
        driver.src = "black uber.png"
        
        driver = new mapboxgl.Marker(driver)
        .setLngLat(destination)
        .addTo(map);
        
        // updating location according to driver details
        
        setInterval(async() => {
            driver.setLngLat(await update_location(ID));
        }, 5000);
    }
}

const update_location = async(ID) => {
    const res = await get_data(`/Driver/driver_location/${ID}`);

    return [res[0].D_Current_Location_lat, res[0].D_Current_Location_long]
}

const update_time_distance = async(Destination, Driver_ID) => {
    let Source = await update_location(Driver_ID);
    Source = Source.join(',')

    // here we need to calculate source from database with driver details
    const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${Source};${Destination}?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ`)

    const time = res.data.routes[0].duration/60
    const distance = res.data.routes[0].distance

    return [time, distance];
}

const ConfirmRide = () => {
    // const {main_data, price, setTrip, driver} = React.useContext(TripsContext);
    const {state} = useLocation();
    const {main_data} = state;

    const [time, setTime] = React.useState(0)
    const [distance, setDistance] = React.useState(0);

    // const Driver_ID = driver.ID;
    const Driver_ID = 1;
    
    React.useEffect(() => {
        const fun = async() => {
            const Source = main_data.Source;
            const Destination = main_data.Destination;
            setTime(main_data.Time)
            setDistance(main_data.Distance)

            const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${Source};${Destination}?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ`)

            const routes_data = res.data.routes[0].geometry.coordinates;

            main_function(routes_data, Source.split(','), Destination.split(','), Driver_ID)
            
            setInterval(async() => {
                const [t, d] = await update_time_distance(Destination, Driver_ID);
                setTime(parseFloat(t).toFixed(2))
                setDistance(parseFloat(d).toFixed(2))

                if(time === distance === 0){
                    setTime("Arrived")
                    setDistance("0 m")
                    return
                }
            }, 5000)

        }

        if(main_data){
            fun()
        }
    }, [])
    
    return(
        <>
           <div className="bg-black w-[100vw] h-[100vh]">
                <Navbar/>
                <div className="w-full h-[12%]"></div>
                <div className="flex items-center flex-col w-full h-full">
                    <div id='map1' className="w-[98%] h-[35%] rounded-3xl map-with-no-search mb-[20px]"></div>

                    <div className="flex w-[90%] h-[60%] ">
                        <div className="w-[65%] h-full p-2 items-center flex flex-col">
                            <div className="w-full h-[20%] flex">
                                <div className="w-[5%] h-[50px] mr-[2%] bg-red-100 rounded-3xl"></div>
                                <div className="w-[70%] h-[65px] bg-[#221D37] rounded-md px-5 flex justify-between">
                                    <div className="flex items-center">
                                        <p>Driver Name</p>
                                    </div>
                                    <div className="flex flex-col justify-evenly">
                                        <p className="text-sm">Vehicle Name</p>
                                        <p>Vehicle Number</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#221D37] w-1/2 h-[40%] rounded-2xl flex flex-col justify-evenly">
                                <div className="flex w-full justify-around items-center">
                                    <p>Time Left: </p>
                                    <p className="text-[40px]">{time}</p>
                                </div>
                                <div className="flex w-full justify-around items-center">
                                    <p>Distance Left: </p>
                                    <p className="text-[40px]">{distance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 p-2 bg-[#221D37] flex flex-col items-center justify-center rounded-3xl">
                            <div className="w-full h-[80%] flex flex-col justify-evenly">
                                <div className="flex w-full justify-around items-center">
                                    <p>Trip Price: </p>
                                    <p className="text-[30px]">523.34</p>
                                </div>
                                <div className="flex w-full justify-around items-center">
                                    <p>GST(18%): </p>
                                    <p className="text-[30px]">94.34</p>
                                </div>
                                <div className="flex w-full justify-around items-center">
                                    <p>Total: </p>
                                    <p className="text-[60px]">617.19</p>
                                </div>
                            </div>
                            <div className="w-full h-[20%] flex justify-center items-center">
                                <button className="w-[80%] h-[60px] bg-[#D90368] rounded-2xl" onClick={() => {
                                    // Razor pay Integration

                                    // Making of entry in trips_table
                                    
                                }}>Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </>
    )
}

export default ConfirmRide;