import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page2.css';
import '../../style/style.css';
import {UserContext} from "../../App.js";
import ShoppingItemDetailList from "../ShoppingItemDetailList.component";
import saleRecordService from "../../services/saleRecordService";
import saleHistoryService from "../../services/saleHistoryService";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";


const ShoppingList = ()  =>{ 
	const loginedAccount = useContext(UserContext);
	const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset, setItemOffset] = useState(0)
	const [itemsPerPage, setitemsPerPage] = useState(4)
	const [load, setload] = useState(false);
	const [pageCount, setPageCount] = useState(0);
	const [RecordData, setRecordData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0)
	const [SaleData, setSaleData] = useState([]);
	
	let navigate = useNavigate();

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(RecordData.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(RecordData.length / itemsPerPage));
		
	}, [itemOffset, itemsPerPage, RecordData]);

	const handlePageClick = (event, length) => {		
		setCurrentPage(event.selected)
		const newOffset = (event.selected * itemsPerPage) % length;
		console.log(
		  `User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};


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

			console.log(response.data[0] !== "0")
			if(response.data[0] !== "0")
			{
				setSaleData(response.data[0])
				
				saleRecordService.GetAllRecordByID(loginedAccount.Account.UserID, response.data[0].SaleID)
				.then(response2 => {       	
					console.log(response2.data)
					setRecordData(response2.data)
					if(response2.data.length % 4 === 0)
					{
						if(response2.data.length/4 - 1 !== currentPage )
						{
							handlePageClick({selected:currentPage-1}, response2.data.length)
						}
					}		
							
				})        
				.catch(e => {
					console.log(e);
				});
			}
			else
			{
				setSaleData("2")
			}
				       
        })        
        .catch(e => {
            console.log(e);
        });    
        
    }

	const updateList = () =>{

		loadCart()	

	}

	const Payment = () =>{
		navigate("/Payment")
	}

	
	return (
		<div className="container-fluid">
			<div className="row">

				<section className="h-100">
					<div className="container py-5">
						<div className="row d-flex justify-content-center my-4">
						<div className="col-md-8">
					
							<div className="card mb-4">
								<div className="card-header py-3">
									<h5 className="mb-0">Cart - {RecordData.length} items</h5>
								</div>
								<div className="card-body">
								
									<ShoppingItemDetailList currentItems={currentItems} Type={"Cart"} updateList={() => updateList()}/>
									{RecordData.length > itemsPerPage ?
									<ReactPaginate
										breakLabel="..."																		
										nextLabel="Next Page >"
										onPageChange={e => handlePageClick(e, RecordData.length)}
										breakClassName={"break-me"}
										pageRangeDisplayed={5}
										pageCount={pageCount}
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
									<span><strong>${SaleData !== "2" ? SaleData.Price:"0"}</strong></span>
								</li>
								</ul>
								{RecordData.length !== 0?
									<button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => Payment()}>
										Go to checkout
									</button>
								:
									null							
								}
								
							</div>
							</div>
						</div>
						</div>
					</div>
				</section>	
			</div>
		</div>
		
	);
}

export default ShoppingList;