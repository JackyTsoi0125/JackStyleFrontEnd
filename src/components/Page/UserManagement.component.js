import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import "../../style/w3.css"
import { Link } from "react-router-dom";
import {UserContext} from "../../App.js";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService";
import UserTable from "../UserTable.component"
//import UserTableColumn from "../../resources/userTable.column"
const UserManagement = ()  =>{ 
    const loginedAccount = useContext(UserContext);
    const [Account, setAccount] = useState([]);
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
            loadAccount();
            setload(true)            
        }
       

	}, [load]);

	const loadAccount = () => {
    
        LoginService.GetAllUser()
        .then(response => {       	
            console.log(response.data)
            setAccount(response.data)
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
						<nav className="w3-sidebar w3-bar-block w3-white w3-animate-left w3-text-grey  w3-center menu" id="mySidebar"><br />											
							<Link to="/Admin/UserManagement" className="w3-bar-item w3-button"> Account Management </Link>
							<Link to="/Admin/ProductManagement" className="w3-bar-item w3-button"> ProductManagement </Link>
						</nav>

						<div className="w3-main content">
                            <UserTable Data={Account} update={() => loadAccount()}/>
						</div>
					</div>

					
                </div>
            </div>
		</div>
	);
}

export default UserManagement;