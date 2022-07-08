import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page2.css';
import '../../style/style.css';
import '../../style/payment.css';
import MessageDialog from "../Dialog/MessageDialog.component";
import {UserContext} from "../../App.js";
import saleHistoryService from "../../services/saleHistoryService";
import { useNavigate } from "react-router-dom";


const Payment = ()  =>{ 


	const loginedAccount = useContext(UserContext);
	const [load, setload] = useState(false);
	const [SaleData, setSaleData] = useState([]);	

    const  [CardHolder, setCardHolder] = new useState("");
    const  [CardNumber1, setCardNumber1] = new useState(null);
    const  [CardNumber2, setCardNumber2] = new useState(null);
    const  [CardNumber3, setCardNumber3] = new useState(null);
    const  [CardNumber4, setCardNumber4] = new useState(null);
    const  [Month, setMonth] = new useState(null); 
    const  [Year, setYear] = new useState(null);
    const  [CVV, setCVV] = new useState(null);

    const [ConfirmUI, setConfirmUI] = useState(false);
    const [ConfirmUI2, setConfirmUI2] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 
    
	let navigate = useNavigate();	

	useEffect(() => {   
        
        if(loginedAccount.Logining === false)
        {
            return navigate("/Home");
        }   

	}, [load]);
  
	useEffect(() => {   
        if(load === false)
		{
			loadCart();
       		setload(true) 
		}		     

	}, [load]);

	const loadCart = () => {
		console.log("loadCart")
		saleHistoryService.GetOneHistoryByUser(loginedAccount.Account.UserID)
        .then(response => { 
			if(response.data !== [])
			{
				setSaleData(response.data[0])
			}				       
        })        
        .catch(e => {
            console.log(e);
        });    
        
    }

    const paySuccess = () =>{
        setConfirmUI2(false)
        navigate("/Home");
    }

    const Pay = () =>{

        if(checkInputNull())
        {
            if(checkInputValid())
            {
                var data = {
                    UserID: loginedAccount.Account.UserID                   
                }
                saleHistoryService.Sold(data)
                .then(response => {                   
                    
                    sendConfirmEmail()
                    setDialogTitle("Payment Request Success!")
                    setMessage("Payment Record has sent to your Email. Please check")
                    setConfirmUI2(true)                    
                    
                })
                .catch(e => {
                   console.log(e);
                })   
            }
        }
    }

    const sendConfirmEmail = () =>{

        var body = ""
        body = "<div>"
        body += "<p>Hi " + loginedAccount.Account.UserName + ",</p>"
        body += "<p>Thank you for choosing our product. </p>"
        body += "<p>The total amount of this purchase is $" + SaleData.Price + ". </p>"
        body += "<p>Please note that We have receipt the payment.</p>"
        body += "<p>You can click the following button to check your payment record.</p>"
        body += "<p><a href='http://localhost:3000/History/" + SaleData.SaleID + "'>Payment Record</a></p>"
        body += "<p>If you have any query, Please contect our service hotline : (852) 6448 8047.</p>"
        body += "<p>Regards,</p>"
        body += "<p>JackStyle</p>"
        body += "</div>"

        var data = {
            UserID: loginedAccount.Account.UserID,           
            Email: loginedAccount.Account.Email,
            UserName: loginedAccount.Account.UserName,
            body : body
        };
        console.log(data)
        saleHistoryService.SendEmaiForPaymentRecord(data)
		.then(response => {   
           
			

		})
		.catch(e => {
			console.log(e);
		})

    }

    
    const checkInputValid = () => {

        if(CardNumber1 < 1000 || CardNumber1 > 9999 || CardNumber2 < 1000 || CardNumber2 > 9999 || CardNumber3 < 1000 || CardNumber3 > 9999 || CardNumber4 < 1000 || CardNumber4 > 9999)
        {
            setDialogTitle("Card Number Invalid!")
            setMessage("Please input valid Card Number")
            setConfirmUI(true)
            return false
        }
        if(Month < 1 || Month > 12 || Year < 2020 || Year > 3000)
        {
            setDialogTitle("Card Expiry Date Invalid!")
            setMessage("Please input valid Card Expiry Date")
            setConfirmUI(true)
            return false
        }
        if(CVV < 100 || CVV > 999 )
        {
            setDialogTitle("CVV Number Invalid!")
            setMessage("Please input valid CVV Number")
            setConfirmUI(true)
            return false
        }

        return true
    }

    const checkInputNull = () => {

        if(CardHolder === "")
        {
            setDialogTitle("Card Holder Missing!")
            setMessage("Please input Card Holder")
            setConfirmUI(true)
            return false
        }

        if( CardNumber1 === "" || CardNumber2 === "" || CardNumber3 === "" || CardNumber4 === "" || CardNumber1 === null || CardNumber2 === null || CardNumber3 === null || CardNumber4 === null)
        {
            setDialogTitle("Card Number Missing!")
            setMessage("Please input Card Number")
            setConfirmUI(true)
            return false
        }
       

        if(Month === "" || Month === null || Year === "" || Year === null)
        {
            setDialogTitle("Card Expiry Date Missing!")
            setMessage("Please input Card Expiry Date")
            setConfirmUI(true)
            return false
        }


        if(CVV === "" || CVV === null)
        {
            setDialogTitle("CVV Number Missing!")
            setMessage("Please input CVV Number")
            setConfirmUI(true)
            return false
        }

        return true
    }

	return (
		<div className="container-fluid">
			<div className="row">

				<section className="h-100 gradient-custom">
					<div className="container py-5">
						<div className="row d-flex justify-content-center my-4">
						<div className="col-md-8">
					
							<div className="card mb-4">
								<div className="card-header py-3">
									<h5 className="mb-0">Check Outs</h5>
								</div>
								<div className="card-body">
                                    <div className="container p-0">
                                        <div className="card px-4">
                                            <p className="h8 py-3">Payment Details</p>
                                            <div className="row gx-3">
                                                <div className="col-12">
                                                    <div className="d-flex flex-column">
                                                        <p className="text mb-1">Credit Card Holder</p>
                                                        <input className="form-control mb-3" type="text" placeholder="Name" value={CardHolder} onChange={(e)=>{ setCardHolder(e.target.value) }}/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-flex flex-column">
                                                        <p className="text mb-1">Card Number</p>                                                       
                                                    </div>
                                                </div>

                                                <div className="col-3">
                                                    <input className="form-control mb-4" type="number" placeholder="1234" value={CardNumber1} onChange={(e)=>{ setCardNumber1(e.target.value) }}/>
                                                </div>
                                                <div className="col-3">
                                                    <input className="form-control mb-4" type="number" placeholder="1234" value={CardNumber2} onChange={(e)=>{ setCardNumber2(e.target.value) }}/>
                                                </div>
                                                <div className="col-3">
                                                    <input className="form-control mb-4" type="number" placeholder="1234" value={CardNumber3} onChange={(e)=>{ setCardNumber3(e.target.value) }}/>
                                                </div>
                                                <div className="col-3">
                                                    <input className="form-control mb-4" type="number" placeholder="1234" value={CardNumber4} onChange={(e)=>{ setCardNumber4(e.target.value) }}/>
                                                </div>
                                                
                                                <div className="col-6">
                                                    <div className="d-flex flex-column">
                                                        <p className="text mb-1">Expiry Date</p>                                                        
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="d-flex flex-column">
                                                        <p className="text mb-1">CVV/CVC</p>                                                       
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    
                                                    <input className="form-control mb-3" type="number" placeholder="MM" value={Month} onChange={(e)=>{ setMonth(e.target.value) }}/>
                                                </div>
                                                <div className="col-3">
                                                    <input className="form-control mb-3" type="number" placeholder="YYYY" value={Year} onChange={(e)=>{ setYear(e.target.value) }}/>
                                                </div>
                                                <div className="col-6">
                                                <input className="form-control mb-3 pt-2" type="password" placeholder="***" value={CVV} onChange={(e)=>{ setCVV(e.target.value) }}/>
                                                </div>
                                                
                                                <div className="col-12">
                                                    <div className="btn2 btn2-primary mb-3 button" onClick={() => Pay()}>
                                                        <span className="ps-3" onClick={() => Pay()}>Pay ${SaleData.Price}</span>
                                                        <span className="fas fa-arrow-right"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
																	
									
								</div>								
							</div>		
							
						</div>
						<div className="col-md-4">
							<div className="card mb-4">
							<div className="card-header py-3">
								<h5 className="mb-0">Summary</h5>
							</div>
							<div className="card-body">
								<ul className="list-group list-group-flush">																
								<li
									className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
									<div>
									<strong>Total amount</strong>									
									</div>
									<span><strong>${SaleData.Price}</strong></span>
								</li>
								</ul>
							</div>
							</div>
						</div>
						</div>
					</div>
				</section>	
			</div>

            <MessageDialog showDialog={ConfirmUI} title={DialogTitle} content={Message} closeUI={() => setConfirmUI(false)}/>
            <MessageDialog showDialog={ConfirmUI2} title={DialogTitle} content={Message} closeUI={() => paySuccess()}/>
		</div>
		
	);
}

export default Payment;