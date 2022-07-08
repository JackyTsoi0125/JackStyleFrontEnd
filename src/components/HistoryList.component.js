import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
//import {UserContext} from "../App.js";
import HistoryCard from "./HistoryCard.component";

const HistoryList = ({currentItems, updateList})  =>{ 
	
        return (  
            <>
               {currentItems &&
               currentItems.map((item, index) => (
                  <HistoryCard item={item} index={index} length={currentItems.length} updateList={() => updateList()}/>
               ))}
            </>  
        );
}

export default HistoryList;