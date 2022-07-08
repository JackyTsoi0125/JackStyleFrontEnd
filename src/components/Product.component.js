import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '../style/style.css';
import "../style/ProductDetail.css"
import {UserContext} from "../App.js";
import { QuantityPicker } from 'react-qty-picker';
import Dialog from "@material-ui/core/Dialog";
import MessageDialog from "./Dialog/MessageDialog.component";
import DeleteRecordDialog from "./Dialog/DeleteRecordDialog.component";
import saleHistoryService from "../services/saleHistoryService";
import saleRecordService from "../services/saleRecordService";
import favlistService from "../services/favlistService";
import Select from 'react-select'

const Products = ({item, favList, reloadData})  =>{ 
	const loginedAccount = useContext(UserContext);
   const [ProductDetailShowm, setProductDetailShow] = useState(false)
   const [SizeText, setSizeText] = useState("")
   const [Quantity, setQuantity] = useState(1)
   const [fav, setfav] = useState(false)
   const [load, setload] = useState(false);
   const Option = [
      { value: 'XS', label: 'XS' },
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },
      { value: 'XL', label: 'XL' },
      { value: 'XXL', label: 'XXL' }
   ]
   const [SizeOption, setSizeOption] = useState(Option)
   const [SelectedSize, setSelectedSize] = useState(SizeOption[0])
   const [SelectedSize2, setSelectedSize2] = useState(SizeOption[0])
   const [ConfirmUI, setConfirmUI] = useState(false);
   const [ConfirmDeleteUI, setConfirmDeleteUI] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 
 
   const showDetail = () =>{      
      console.log(item)
      var list = []
      if(item.XS === 1)
      {
         list.push("XS")  
      }
      if(item.S === 1)
      {
         list.push("S")  
      }
      if(item.M === 1)
      {
         list.push("M")  
      }
      if(item.L === 1)
      {
         list.push("L")  
      }
      if(item.XL === 1)
      {
         list.push("XL")  
      }
      if(item.XXL === 1)
      {  
         list.push("XXL")  
      }
      setSizeText(list.join(","))
      setProductDetailShow(true)
   }
   const UpdateRecord = (record, SaleID) =>{
      console.log(record)
      var data = {
         ID: record[0].ID,
         Price: item.Price * Quantity + record[0].Price,
         Quantity: Quantity + record[0].Quantity,
         SaleID: SaleID
      }

      console.log(data)

      saleRecordService.UpdateRecord(data)
      .then(response => {       	
        
      })        
      .catch(e => {
          console.log(e);
      });

   }

   useEffect(() => {   
        
      if(loginedAccount.Logining === true )
      {
        
         favlistService.GetFav(item.ProductID, loginedAccount.Account.UserID)
         .then(response => {      	
           
            if(response.data[0] === "NO FavList")
            {
               setfav(false)
            }
            else
            {
               setfav(true)
            }
         })        
         .catch(e => {
             console.log(e);
         });     
         
      }
      

 }, [loginedAccount, item]);


   const AddToCart = () =>{

      var data = {
         UserID: loginedAccount.Account.UserID,
         Price: item.Price * Quantity         
      }
      saleHistoryService.HistoryUpdate(data)
      .then(response => {   
         
         var data2 = {
            UserID: loginedAccount.Account.UserID,
            Price: item.Price * Quantity,
            SaleID: response.data[0],
            ProductID: item.ProductID,
            Size: SelectedSize2.value?SelectedSize2.value : SelectedSize2,
            Quantity: Quantity,
            Name: item.Name,
            ProductImage: item.ProductImage
         }

         saleHistoryService.GetOneHistoryByUser(loginedAccount.Account.UserID)
        .then(response2 => { 
            if(response2.data !== [])
            {
              
               var data3 = {
                  UserID: loginedAccount.Account.UserID,
                  ProductID: item.ProductID,
                  Size: SelectedSize2.value?SelectedSize2.value : SelectedSize2,
                  SaleID: response2.data[0].SaleID
               }
               
               console.log(data3)
               saleRecordService.GetRecordIfExist(data3)
               .then(response3 => {   
                  console.log(response3.data)
                  if(response3.data[0] ===  "No Record")
                  {
                     console.log("run")
                     saleRecordService.NewRecord(data2)
                     .then(response4 => {   
                        
                        setDialogTitle("Product was add to Cart!")
                        setMessage("Please check your Cart")
                        setConfirmUI(true)

                     })
                     .catch(e => {
                        console.log(e);
                     }) 
                  }
                  else
                  {
                     UpdateRecord(response3.data, response2.data[0].SaleID)
                  }
   
               })
               .catch(e => {
                  console.log(e);
               }) 
            }
				       
        })        
        .catch(e => {
            console.log(e);
        });

      })
      .catch(e => {
         console.log(e);
      })   
   }

   const AddToFavourite = () =>{
      
     

      favlistService.AddToFavList(item.ProductID,loginedAccount.Account.UserID )
      .then(response => {   
         setfav(true)
      })        
      .catch(e => {
          console.log(e);
      });     
      

   }
   const askRemoveFavourite = () =>{
      
      setDialogTitle("Remove Favourite Confirm?")
      setMessage("Confirm to Delete Product : " + item.Name + " from Favourite?")
      setConfirmDeleteUI(true)
   }

   const RemoveFavourite = () => {    

      favlistService.RemoveFavList(item.ProductID,loginedAccount.Account.UserID)
      .then(response => {   
         setfav(false)
         setProductDetailShow(false)
         if(favList)
         {
            reloadData()
         }

      })        
      .catch(e => {
          console.log(e);
      });  

   }
	return (          
       
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">            
         <div className="glasses_box">
            <figure><img width="200" height="200" className="file" src={"http://localhost:7000/images/" + item.ProductImage} alt="ProductImage" /></figure>
            <h3><span className="blu">$</span>{item.Price}</h3>           
            <p>{item.Name}</p>
            <div className="col-md-12">
               <p className="read_more button" onClick={() => showDetail()}>Read More</p>
            </div>
         </div>

         <Dialog maxWidth={"lg"} fullWidth={true} open={ProductDetailShowm}>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossOrigin="anonymous" />
         
         <div className="container">
            <div className="row">
               <div className="col-md-5">
                    
                     <div className="project-info-box mt-0">
                     <button type="button" className="btn btn-outline-primary" onClick={() => setProductDetailShow(false)}>Close</button>
                        <h3>Product Detail</h3>
                        <p className="mb-0">{item.Description}</p>
                     </div>

                     <div className="project-info-box">
                        <p><b>Name:</b> {item.Name}</p>
                        <p><b>Type:</b> {item.Type}</p>
                        <p><b>ProductionPlace:</b> {item.ProductionPlace}</p>
                        <p><b>Size:</b> {SizeText}</p>
                        <p className="mb-0"><b>Price:</b> ${item.Price}</p>
                     </div>
                     {loginedAccount.Logining?
                     <div className="project-info-box mt-0 mb-0">
                        <p className="mb-0">
                           <span className="fw-bold mr-10 va-middle hide-mobile">Size : </span>
                           <Select  className="input" options={SizeOption} defaultValue={SelectedSize} onChange={(e) => setSelectedSize2(e.value)}/>                           
                        </p>
                        <p className="mb-0">
                           <span className="fw-bold mr-10 va-middle hide-mobile">Quantity : </span>
                           <QuantityPicker min={1} value={Quantity} onChange={(e) => setQuantity(e)} className="input"/>                           
                        </p>
                        <p className="mb-0">
                           
                           <button type="button" className="btn btn-outline-primary" onClick={() => AddToCart()}>Add To Cart</button> 
                           {"              "}
                           {
                           !fav? 
                           <button type="button" className="btn btn-outline-primary" onClick={() => AddToFavourite()}>Add Favourite</button>  
                           :
                           <button type="button" className="btn btn-outline-primary" onClick={() => askRemoveFavourite()}>Remove Favourite</button> 
                           }
                                                  
                        </p>
                     </div> : null}
                     
               </div>

               <div className="col-md-7">
                     <img src={"http://localhost:7000/images/" + item.ProductImage} alt="ProductImage" width="250" className="rounded" />                     
               </div>

               <MessageDialog showDialog={ConfirmUI} title={DialogTitle} content={Message} closeUI={() => setConfirmUI(false)}/>
               <DeleteRecordDialog showDialog={ConfirmDeleteUI} title={DialogTitle} content={Message} closeUI={() => setConfirmDeleteUI(false)} deleteRecord={() => RemoveFavourite()}/>
            </div>
         </div>                    
         </Dialog>

      </div>
	); 
}

export default Products;