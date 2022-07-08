import React, {useContext, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
import "../style/ProductDetail.css"
import { useNavigate } from "react-router-dom";
const HistoryCard = ({item, index, length, updateList})  =>{ 

    let navigate = useNavigate();
    
    const showDetail = () =>{
        if(item.status === "Hold")
        {
            return navigate("/Cart");
        }
        else
        {
            return navigate("/History/" + item.SaleID);
        }
        
    }
	return (  
        <>
            <div className="row">
                <div>
                    <div className="container p-0">
                        <div className="px-4 ">                           
                            <div className="row gx-3">
                                <div className="col-3">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1"> Record {item.status === "Hold" ? length : index}</p>                                        
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1"> Status : {item.status === "Hold" ? "Unpaid" : "Paid"}</p>                                        
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="d-flex flex-column">
                                        <p className="text mb-1"> Total Price : {item.Price}</p>                                        
                                    </div>
                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => showDetail()}>
										Show Detail
									</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>																
                    
                </div>	
            </div>
            <hr className="my-4" />
           
        </>        
	); 
}

export default HistoryCard;