import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
//import {UserContext} from "../App.js";

import Product from "./Product.component";

const Products = ({currentItems, favList, reloadData})  =>{ 
	

	
        return (  
            <>
               {currentItems &&
               currentItems.map((item) => (
                  <Product item={item} favList={favList} reloadData={() => reloadData()}/>
               ))}
            </>  
        );
}

export default Products;