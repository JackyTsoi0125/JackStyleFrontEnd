import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import {  Link } from "react-router-dom";
//import {UserContext} from "../App.js";

import bg from "../../images/bg.png"

const Home = ()  =>{ 
	
  
	useEffect(() => {   
	
	});

	
	return (
		<div className="main-layout">
		    <section className="banner_main">
                <div id="banner1" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                    <li data-target="#banner1" data-slide-to="0" className="active"></li>
                    <li data-target="#banner1" data-slide-to="1"></li>
                    <li data-target="#banner1" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="carousel-caption">
                                    <div className="text-bg">
                                    <h1> <span className="blu">Welcome <br /></span>To JackStyle</h1>
                                    
                                        <img className="photo" src={bg} alt="#"/>
                                   
                                    <Link to="/Product" className="read_more2"> Product </Link> 
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                   
                </div>
            </section>
		</div>
	);
}

export default Home;