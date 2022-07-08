import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import "../../style/w3.css"
import { Link } from "react-router-dom";
import {UserContext} from "../../App.js";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import ProductTable from "../ProductTable.component"



const ProductManagement = ()  =>{ 
	
	const loginedAccount = useContext(UserContext);
    const [Product, setProduct] = useState([]);
    const [load, setload]= useState(false);
	let navigate = useNavigate();

	useEffect(() => {   
        
        if(loginedAccount.Logining === false)
        {
            return navigate("/Home");
        }
        else if(loginedAccount.Account.Role !== "admin")
        {
            return navigate("/Home");
        }
        else if (!load)
        {
            loadProduct();
            setload(true)
            
        }
       

	}, [load]);

	const loadProduct = () => {
    
        ProductService.GetAllProduct()
        .then(response => {       	
            console.log(response.data)
            setProduct(response.data)
        })
        
        .catch(e => {
            console.log(e);
        });
    }
	
	return (
		<div>
		    <div className="container-fluid">
                <div className="row">
					<div >
						<div className="w3-sidebar w3-bar-block w3-white w3-animate-left w3-text-grey  w3-center menu" id="mySidebar"><br />											
							<Link to="/Admin/UserManagement" className="w3-bar-item w3-button"> Account Management </Link>
							<Link to="/Admin/ProductManagement" className="w3-bar-item w3-button"> ProductManagement </Link>
						</div>

						<div className="w3-main content">
							<ProductTable Data={Product} update={() => loadProduct()}/>
						</div>
					</div>

					
                </div>
            </div>
		</div>
	);
}

export default ProductManagement;