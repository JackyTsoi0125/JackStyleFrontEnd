import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import {  Link } from "react-router-dom";
//import {UserContext} from "../App.js";



const AboutUS = ()  =>{ 
	
	const [preview, setPreview] = useState("http://localhost:7000/images/Loose Sleeve Cotton T-Shirt.jpeg")
	useEffect(() => {   
	
	});

	
	return (
		<div>
		     <div className="about">
				<div className="container">
					<div className="row d_flex">
					<div className="col-md-5">
						<div className="about_img">
							<figure><img width="390" className="file" src={preview} alt="ProductImage" /></figure>
						</div>
					</div>
					<div className="col-md-7">
						<div className="titlepage">
							<h2>About Our Shop</h2>
							<p>Founded in 2022, JackStyle is an online shopping platform for Hong Kong people. We sell high quality clothes, each of those clothes has a unique design style. Customers also can design unique clothes style according to their personal requirements. And we also have many types of clothes, including T-shirts, Jackets, Long Shirts, and Hoodie. Through simple safe payment methods and stable delivery services, you can buy your favorite products anytime, anywhere, and enjoy the most perfect online shopping experience.<br />JackStyle goal is to become the largest online shopping platform in Hong Kong. In the future, we will continue to combine technology and online shopping to provide better and more time saving online shopping services.</p>
						</div>
						<Link to="/Product" className="read_more2"> Read more </Link> 
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutUS;