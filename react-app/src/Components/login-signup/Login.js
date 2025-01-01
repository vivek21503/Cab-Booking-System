import React from "react";
import "./login_style.css"
import Navbar from "../Navbar";
import axios from "axios"
import { CustomerContext } from "../../requests/useContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Toast_Container, createError } from "../../requests/createErrors";

const Login = () => {
    const [credentials, setCredentials] = React.useState({
        person: "Client",
        email: undefined,
        password: undefined,
    });
    const {setDetails, setlogin, setToken} = React.useContext(CustomerContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const submit = async() => {
        try {
            if(credentials.email != undefined && credentials.password != undefined){
                const res = await axios.post("http://localhost:8000/auth/login", {
                    "person" : credentials.person,
                    "Email": credentials.email,
                    "Password": credentials.password
                });
                
                const {token, ...details} = res.data;

                setDetails(details);
                setToken(token);

                // setting a cookie
                Cookies.set("auth", JSON.stringify(details));
                Cookies.set("serv_auth", token);
                setlogin(true);

                if(credentials.person === "Driver"){
                    navigate("/Driver");
                    window.location.reload()
                }
                else{
                    navigate("/");
                    window.location.reload()
                }

            }
        } catch (error) {
            console.log("Wrong password or username!!!");           // here will be different code for wromg password and username
            createError("Wrong password or username!!!")
        }
    }

    return(
        <>
            <Navbar/>
            <div className="inside">
            <div className="inside1 mt-[9%]">  
                <div className="center-align"> 
                    <input type="radio" name="size" id="size_1" value="small" checked />
                    <label for="size_1" onClick={() => {credentials.person = "Client"
                setCredentials(credentials)}}>Client</label>
                    <input type="radio" name="size" id="size_2" value="small" />
                    <label for="size_2" onClick={() => {credentials.person = "Driver"
                setCredentials(credentials)}}>Driver</label>  
                </div>      
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="inp"
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="inp"
                    onChange={handleChange}
                />
                <br/>
                <div  className="remfor items-center flex">

                    <input type="checkbox" id="remember" name="remember" className="ml-[20px]"/>
                    
                    <label for="remember" className="text-[15px] my-0 mx-[1%]"> Remember Me</label><br/>
                    <a href="/" className="forgot">Forgot Password?</a>
                </div>
                <br/>
                <button type="submit" onClick={() => {submit()}} className="login">Log In</button>
                <br/><br/><br/><br/>
                <p className=" text-[15px] ml-[20%]">
                    Dont have a account yet?
                </p>
                <a href="/SignUp" className="forgot2" style={{marginLeft:"25%"}}>Create an account</a>
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

        <Toast_Container/>
        </>
    )
}

export default Login;