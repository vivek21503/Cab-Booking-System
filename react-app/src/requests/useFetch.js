import React from "react"
import axios from "axios"
import { createError } from "./createErrors";

export const Get_Data_Component = (url) => {
    const [data, setData] = React.useState();
    // const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        async function get_data(){
            // setLoading(true);
            try{
                const res = await axios.get(`http://127.0.0.1:8000${url}`);
                setData(res.data);
                // setLoading(false);
            }
            catch(err){
                console.log(err);
                setError(err);
            }
        }

        get_data()
        
    }, [url])

    // return {data, loading, error}
    return {data, error}
}

export const Post_Data_Component = (url, Data) => {
    const [data, setData] = React.useState();
    const [error, setError] = React.useState();

    React.useEffect(() => {
        async function get_data(){
            try{
                const res = await axios.post(`http://127.0.0.1:8000${url}`, Data);
                setData(res.data);
            }
            catch(err){
                console.log(err);
                setError(err);
            }
        }

        get_data()
        
    }, [url])

    return {data, error}
}

export const get_data = async(url) => {
    try{
        const res = await axios.get(`http://127.0.0.1:8000${url}`);
        return res.data;
    }
    catch(err){
        return undefined;
    }
}

export const post_data = async(url, data) => {
    try{
        const res = await axios.post(`http://127.0.0.1:8000${url}`, data);
        return res.data;
    }
    catch(err){
        return undefined;
    }
}