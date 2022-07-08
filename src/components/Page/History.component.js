import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page2.css';
import '../../style/style.css';
import '../../style/payment.css';
import {UserContext} from "../../App.js";
import saleHistoryService from "../../services/saleHistoryService";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import HistoryList from "../HistoryList.component";
import { mdiConsolidate } from "@mdi/js";

const History = ()  =>{ 


	const loginedAccount = useContext(UserContext);
	const [load, setload] = useState(false);
    const [SaleData, setSaleData] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset, setItemOffset] = useState(0)
	const [itemsPerPage, setitemsPerPage] = useState(4)
	const [pageCount, setPageCount] = useState(0);
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
			loadHistory()
       		setload(true) 
		}		     

	}, [load]);

    useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(SaleData.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(SaleData.length / itemsPerPage));
       
		
	}, [itemOffset, itemsPerPage, SaleData]);

	const handlePageClick = (event, length) => {		
		
		const newOffset = (event.selected * itemsPerPage) % length;
		console.log(
		  `User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

    const loadHistory = () =>{
        saleHistoryService.GetAllHistoryByUser(loginedAccount.Account.UserID)
        .then(response => { 

			if(response.data[0] !== "0")
			{                   
				setSaleData(response.data)       
                console.log(response.data)                        
			}            
            			       
        })        
        .catch(e => {
            console.log(e);
        });  
    }

    const updateList = () =>{

		loadHistory()	

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
                                        <h5 className="mb-0">History - {SaleData.length} items</h5>
                                    </div>
                                    <div className="card-body">
                                    
                                        <HistoryList currentItems={currentItems} updateList={() => updateList()}/>
                                        {SaleData.length > itemsPerPage ?
                                        <ReactPaginate
                                            breakLabel="..."																		
                                            nextLabel="Next Page >"
                                            onPageChange={e => handlePageClick(e, SaleData.length)}
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
						
						</div>
					</div>
				</section>	
			</div>
		</div>	
	);
}

export default History;