import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"
import axios from "axios";
import Cookies from "js-cookie";
import { post_data } from "../requests/useFetch";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})


export function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

export function errorLocation() {
  setupMap([-2.24, 53.48])
}


export let map = "";
export function setupMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  })
  
  const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)


  var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, "top-left")

  var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = '#0096FF'
    el.style.width = '15px';
    el.style.height = '15px';
    el.style.borderRadius = '25px';
    
    new mapboxgl.Marker(el)
    .setLngLat(center)
    .addTo(map);

    // adding markers
    async function add_markers(ID, token){      
      const markers = await Adding_Cars(map, center, ID, token);
      if(markers){
        setInterval(() => {Updating_locations(markers, center, ID, token)}, 5000);
      }
    }

    // to retrieve Client ID
    const cookie_data = Cookies.get("auth");
    const token = Cookies.get("serv_auth");
    if(cookie_data){
      const Client_ID = JSON.parse(cookie_data).details.Client_ID;
      add_markers(Client_ID, token)
    }
    else{
      console.log("Please do the login part");
    }
}

export function add_marker(map, coordinates){

    var el = document.createElement('img');
    el.className = 'car_marker';
    el.style.width = '40px';
    el.style.height = '23px';
    el.src = "black uber.png"

    let marker = new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .addTo(map);

    return marker;

}

export const input_values = () => {
    return({
        Source: document.getElementsByClassName('mapboxgl-ctrl-geocoder')[0].children[1].value,
        Destination: document.getElementsByClassName('mapboxgl-ctrl-geocoder')[1].children[1].value,
        Time: document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary')[0].children[0].textContent,
        Distance: document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary')[0].children[1].textContent
    })
}

const Adding_Cars = async(map, center, ID, token) => {
  try{
    const res = await post_data(`/Client/drivers_nearby/${ID}/${token}`, {
      curr_long: center[0],
      curr_lat: center[1],
      distance: 2
    })
    
    const data = res;
    if(data){
      let markers = [];
  
      data.map((coordinates) => {
        let marker = add_marker(map, [coordinates.D_Current_Location_long,coordinates.D_Current_Location_lat])
        markers.push(marker);
      })
  
      return markers;
    }
    else{
      return undefined;
    }

  }
  catch(err){
      return;         // error needs to be created here
  }
}

const Updating_locations = async(markers, center, ID, token) => {
  try{

    const res = await post_data(`/Client/drivers_nearby/${ID}/${token}`, {
      curr_long: center[0],
      curr_lat: center[1],
      distance: 2
    })
    
    const data = res.data;

    for(let i=0; i<markers.length;i++){
      markers[i].setLngLat([data[i].D_Current_Location_long,data[i].D_Current_Location_lat])
    }

  }
  catch(err){
      return;
  }
}






// how to make requests with mapboxgl
// https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ


// we can do mark the source and destination on map and then calculate the distance and average -- by making api request  
// or we can calculate the distance with our own algorithm -- by routing the directons

// https://api.mapbox.com/directions/v5/mapbox/driving/77.26573,28.54483;77.26918,28.54852?geometries=geojson&access_token=pk.eyJ1Ijoib20yMTQ4MSIsImEiOiJjbGRobTBreDUxM2w1M3F0NTd4ZG01ZXEzIn0.l7-GFstLQOdYhnkUMbHukQ
// we can get distance by this


// Examples

// Place to Co-ordinates

// example query for the address “515 15th St NW, Washington, DC 20004”,

// https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.json?types=address&access_token=YOUR_MAPBOX_ACCESS_TOKEN

// Co-ordinates to Place

// https://api.mapbox.com/geocoding/v5/mapbox.places/-122.463%2C%2037.7648.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN