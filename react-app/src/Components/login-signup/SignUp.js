import React from "react";
import "./SignUp_style.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const SignUp = () => {
    const [credentials, setCredentials] = React.useState({
        person: "Client",
        Firstname: undefined,
        Lastname: undefined,
        DOB: undefined,
        Email: undefined,
        Password: undefined,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const submit = async() => {
        try {
            if(credentials.Email != undefined && credentials.Password != undefined && credentials.Firstname != undefined && credentials.DOB != undefined){
                if(credentials.Lastname === undefined){
                    setCredentials({Lastname: ""})
                }

                const new_date = credentials.DOB.split("/").reverse().join("-")
                setCredentials({
                    DOB: new_date
                })
    
                const res = await axios.post("http://localhost:8000/auth/register", {
                        "person" : credentials.person,
                        "Firstname": credentials.Firstname,
                        "Lastname": credentials.Lastname,
                        "DOB": credentials.DOB,
                        "Email": credentials.Email,
                        "Password": credentials.Password
                });

                console.log(res);

                const fun = async() => {
                    console.log("Registration Success");
                    navigate("/Login");
                }

                await fun();
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <Navbar/>
            <div className="inside">
        <div className="inside1">        
        <div className="center-align"> 
            <input type="radio" name="size" id="size_1" value="small" checked />
             <label for="size_1" onClick={() => {credentials.person = "Client"
                setCredentials(credentials)}}>Client</label>
             <input type="radio" name="size" id="size_2" value="small" />
             <label for="size_2" onClick={() => {credentials.person = "Driver"
            setCredentials(credentials)}}>Driver</label>  
        </div>
            <div className="w-full flex h-[22%] mb-[4%]">
                <input 
                type={"text"} 
                placeholder="First Name" 
                className="inp10"
                id="Firstname"
                onChange={handleChange}/>
                <input 
                type={"text"} 
                placeholder="Last Name" 
                className="inp10"
                id="Lastname"
                onChange={handleChange}/>
            </div>
            <input 
            type={"date"} 
            placeholder="DOB" 
            className="inp"
            id="DOB"
            onChange={handleChange}/>
            <br/>
            <input 
            type={"text"} 
            placeholder="Email" 
            className="inp"
            id="Email"
            onChange={handleChange}/>
            <br/>
            <input 
            type={"password"} 
            placeholder="Password" 
            className="inp"
            id="Password"
            onChange={handleChange}/>
            <br/>
            <div className="remfor items-center flex">
                <input type="checkbox" id="remember" name="remember" className="ml-[20px]"/>
                <label for="remember" className="text-[15px] my-0 mx-[1%]"> Remember Me</label><br/>
            </div>
            <br/>
            <button className="login" onClick={() => {submit()}}>Sign In</button>
            <br/><br/>
            <p className=" text-[15px] ml-[21%]">
                Already Have an Account
            </p>
            <a href="/Login" className="forgot2">Log In</a>
        </div>
        <div className="line">
        </div>
        <div className="inside2" id="id1">
                <div className = "figure">
                    <img src="figure11.jpg" alt="" />
                    <img src="figure12.jpg" alt="" />
                    <img src="figure10.jpg" alt="" />
                    <img src="figure11.jpg" alt="" />
                </div>
         </div>
    </div>

        </>
    )
}

export default SignUp;