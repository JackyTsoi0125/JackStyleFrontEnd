import React, { useEffect, useState, useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page2.css';
import '../../style/style.css';
import '../../style/payment.css';
import {UserContext} from "../../App.js";
import Login from "../Login.component";
import ResetPassword from "../ResetPassword.component";
import MessageDialog from "../Dialog/MessageDialog.component";
import saleHistoryService from "../../services/saleHistoryService";
import saleRecordService from "../../services/saleRecordService";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ShoppingItemDetailList from "../ShoppingItemDetailList.component";
const HistoryDetail = ()  =>{ 


	const loginedAccount = useContext(UserContext);
	const [load, setload] = useState(false);
    const [LoginUI, setLoginUI] = useState(false)
    const [ResetPasswordUI, setResetPasswordUI] = useState(false)
    const [MessageUI, setMessageUI] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState("");
    const [RecordData, setRecordData] = useState([]);
    const [SaleData, setSaleData] = useState([]);
    const { SaleID } = useParams();	
    const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset, setItemOffset] = useState(0)
	const [itemsPerPage, setitemsPerPage] = useState(4)
	let navigate = useNavigate();	

	useEffect(() => {   

		if(!load)
		{
			if(loginedAccount.Logining === false) 
			{
				setLoginUI(true) 
				setload(true)           
			}
			else
			{


				saleHistoryService.GetOneHistoryByUserIDandHistoryID(loginedAccount.Account.UserID, parseInt(SaleID))
				.then(response => { 
					setSaleData(response.data[0])	
					console.log(response.data)								
				})        
				.catch(e => {
					console.log(e);
				});  

				saleRecordService.GetAllRecordByID(loginedAccount.Account.UserID, parseInt(SaleID))
				.then(response2 => {       	
				
					setRecordData(response2.data)				
						
				})        
				.catch(e => {
					console.log(e);
				});
				setload(true)
			}
		}       
        

	}, [load]);
    

    useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(RecordData.slice(itemOffset, endOffset));
		
		
	}, [itemOffset, itemsPerPage, RecordData]);

	const handlePageClick = (event, length) => {		
		
		const newOffset = (event.selected * itemsPerPage) % length;
		console.log(
		  `User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

    const backToHome = () =>{
        setLoginUI(false)
        return navigate("/Home");
    }
    const CancelResetPassword = () =>{
        setResetPasswordUI(false)
        setLoginUI(true)
    }

	

    const LoginSuccess = (username) =>{

        loginedAccount.setAccount(username)
        loginedAccount.setLogining(true)
        setLoginUI(false)

		saleHistoryService.GetOneHistoryByUserIDandHistoryID(username.UserID, parseInt(SaleID))
        .then(response => { 
			console.log(response.data)		
			if(response.data[0] !== "NO FavList")
			{
				setSaleData(response.data[0])
				
                saleRecordService.GetAllRecordByID(username.UserID, parseInt(SaleID))
				.then(response2 => {       	
					
					console.log(response2.data)
					setRecordData(response2.data)
					
						
				})        
				.catch(e => {
					console.log(e);
				});              
			}
            else
            {
                setDialogTitle("Login Success!")
				setMessage("You have no access right to view this record. The page will redirect to Home Page!")
				setMessageUI(true)
            }   
            			       
        })        
        .catch(e => {
            console.log(e);
        }); 

    }

    const closeMessageUI = () =>{
        setMessageUI(false)
        return navigate("/Home")
    }

	const backToHistory = () =>{        
        return navigate("/History")
    }

    
	const updateList = () =>{

	}

    const resetPassword = () =>{
        setLoginUI(false)
        setResetPasswordUI(true)
    }
	return (
		<div className="container-fluid">
			<div className="row">
				
                <section className="h-100">
					<div className="container py-5">

						<div className="container">
							<div className="row">
								<div className="col-md-10 offset-md-1">
									<div className="titlepage HistoryText">
										<div className="row gx-3">											
											<div className="col-2">
												<button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => backToHistory()}>
													Back
												</button>
											</div>
											
										</div>
																				
									</div>
								</div>
							</div>
						</div>
						<div className="row d-flex justify-content-center my-4">
						<div className="col-md-8">
					
							<div className="card mb-4">
								<div className="card-header py-3">
									<h5 className="mb-0">Cart - {RecordData.length} items</h5>
								</div>
								<div className="card-body">
								
									<ShoppingItemDetailList currentItems={currentItems} Type={"History"} updateList={() => updateList()}/>
									{RecordData.length > itemsPerPage ?
									<ReactPaginate
										breakLabel="..."																		
										nextLabel="Next Page >"
										onPageChange={e => handlePageClick(e, RecordData.length)}
										breakClassName={"break-me"}
										pageRangeDisplayed={5}
									
										previousLabel="< Pervious Page"
										renderOnZeroPageCount={null}
										containerClassName={"pagination"}
										subContainerClassName={"pages pagination"}						
										activeClassName={"active"}
									/>		 : null}									
									
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
            { LoginUI?  <Login login={username => LoginSuccess(username)} closeUI={(rec) => backToHome(rec)}  resetPassword={(rec) => resetPassword(rec)} /> : null }
            { ResetPasswordUI?  <ResetPassword  closeUI={() => CancelResetPassword()} /> : null }
            <MessageDialog showDialog={MessageUI} title={DialogTitle} content={Message} closeUI={() => closeMessageUI()}/>
		</div>
		
	);
}

export default HistoryDetail;