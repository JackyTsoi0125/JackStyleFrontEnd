import React, {useContext, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
import "../style/ProductDetail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { QuantityPicker } from 'react-qty-picker';
import saleRecordService from "../services/saleRecordService";
import saleHistoryService from "../services/saleHistoryService";
import {UserContext} from "../App.js";
import DeleteRecordDialog from "./Dialog/DeleteRecordDialog.component";

const ShoppingItemDetail = ({item, Type, updateList})  =>{ 

    const loginedAccount = useContext(UserContext);

    const [ConfirmDeleteUI, setConfirmDeleteUI] = useState(false);
    const [DialogTitle, setDialogTitle] = useState("");
    const [Message, setMessage] = useState(""); 

    const updateCartCount = (e) =>{
        console.log("Old Value : " + item.Quantity)
        console.log("New Value : " + e)
        UpdateRecord(e)
        if(e > item.Quantity)
        {   
            
            var data = {
                UserID: loginedAccount.Account.UserID,
                Price: item.Price/item.Quantity * (e - item.Quantity)       
            }
            
            saleHistoryService.AddartProductUpdate(data)
            .then(response => {                  
            })        
            .catch(e => {
                console.log(e);
            });


        }
        else if(e < item.Quantity)
        {
            
            var data2 = {
                UserID: loginedAccount.Account.UserID,
                Price: item.Price/item.Quantity * (item.Quantity - e)       
            }
            
            saleHistoryService.RemoveCartProductUpdate(data2)
            .then(response => {
                
            })        
            .catch(e => {
                console.log(e);
            });
        }

    }

    const UpdateRecord = (e) =>{

        var data = {
            ID: item.ID,
            Price: item.Price/item.Quantity * e,
            Quantity: e,
            SaleID: item.SaleID
        }

        saleRecordService.UpdateRecord(data)
        .then(response => {       	
            updateList()
        })        
        .catch(e => {
            console.log(e);
        });

    }

    const DeleteFromCart = (e) => {

        setDialogTitle("Remove Confirm?")
        setMessage("Confirm to Remove " + item.ProductName + " from Cart?")
        setConfirmDeleteUI(true)
  

    }

    const deleteConfirm = () => {

        var data2 = {
            UserID: loginedAccount.Account.UserID,
            Price: item.Price       
        }
        console.log(data2)       
        saleHistoryService.RemoveCartProductUpdate(data2)
        .then(response => {
            
        })        
        .catch(e => {
            console.log(e);
        });

        saleRecordService.DeleteRecord(item.ID)
        .then(response => {       	
            updateList()
            setConfirmDeleteUI(false)
            setDialogTitle("")
            setMessage("")
        })        
        .catch(e => {
            console.log(e);
        });

    }

	return (  
        <>
            <div className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    
                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src={"http://localhost:7000/images/" + item.ProductImage}
                        className="w-100" alt="Blue Jeans Jacket" />
                    <a href="#!">
                        <div className="mask mask2" ></div>
                    </a>
                    </div>
                
                </div>

                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    
                    <p><strong>{item.ProductName}</strong></p>
                   
                    <p>Size: {item.Size}</p>
                    {Type === "Cart" ?  <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                    title="Remove item" onClick={() => DeleteFromCart()}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button> : null}
                    
                   
                    
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    
                    <div className="d-flex mb-4 div" >                 

                        <div className="form-outline">
                            <label className="form-label" htmlFor="form1">Quantity : </label>
                            {Type === "Cart"? <QuantityPicker min={1} value={item.Quantity} onChange={(e) => updateCartCount(e)} className="input"/> : item.Quantity}
                            
                            
                        </div>
                  
                    </div>
                    
                    <p className="text-start text-md-center">
                    <strong>${item.Price}</strong>
                    </p>
                    
                </div>
            </div>
            <hr className="my-4" />
            <DeleteRecordDialog showDialog={ConfirmDeleteUI} title={DialogTitle} content={Message} closeUI={() => setConfirmDeleteUI(false)} deleteRecord={() => deleteConfirm()}/>
        </>        
	); 
}

export default ShoppingItemDetail;