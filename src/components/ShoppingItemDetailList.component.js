import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
//import {UserContext} from "../App.js";
import ShoppingItemDetail from "./ShoppingItemDetail.component";

const ShoppingItemDetailList = ({currentItems, updateList, Type})  =>{ 
	

	
        return (  
            <>
               {currentItems &&
               currentItems.map((item) => (
                  <ShoppingItemDetail item={item} Type={Type} updateList={() => updateList()}/>
               ))}
            </>  
        );
}

export default ShoppingItemDetailList;