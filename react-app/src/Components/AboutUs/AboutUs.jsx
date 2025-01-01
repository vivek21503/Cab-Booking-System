import Navbar from "../Navbar";
import "./style2.css"
import React from "react";

const About = () => {
    return(
        <>
        <Navbar/>
        <div className="inside-about">
            <div className="inside-about1">
                <img src="om1.png" alt="error" style={{width:'300px'}} className="img1"/>
                <div className="h1p" style={{float:'right'}}>
                    <h1>ABOUT OUR COMPANY</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ea vero distinctio aperiam est explicabo eaque consectetur eius repudiandae. A quo vitae repellendus, doloremque reprehenderit vero? Quos a iste provident illum vitae reprehenderit nulla?</p>
                </div>
            </div>
            <div className="inside-about2">
                <div className="h1p" style={{float:'left', paddingLeft:'150px', paddingTop:'50px'}}>
                    <h1>WHY US?</h1>
                    <p style={{marginTop:'20px'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde debitis iusto animi vero fugit. Porro aperiam provident harum voluptatum error.</p>
                </div>
                <img src="om1.png" alt="error" className="img2" style={{marginLeft:"200px", marginBottom:'30px', width:'300px'}}/>
            </div>
        </div>
        </>
    )
}

export default About;