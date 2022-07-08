import React, { useEffect, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page.css';
import '../../style/style.css';
import {UserContext} from "../../App.js";
import ProductService from "../../services/ProductService";
import favlistService from "../../services/favlistService";
import ReactPaginate from 'react-paginate';
import Products from "../Products.component";
import { useNavigate } from "react-router-dom";



const FavouriteList = ()  =>{ 
	
	const [load, setload]= useState(false);
	const loginedAccount = useContext(UserContext);
	const [currentItems, setCurrentItems] = useState(null);
    const [ProductData, setProductData] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	let navigate = useNavigate();
	const [itemOffset, setItemOffset] = useState(0)
	const [itemsPerPage, setitemsPerPage] = useState(4)
	useEffect(() => {   
        if(load === false)
		{
			loadProduct();
       		setload(true) 
		}		     

	}, [load]);

	useEffect(() => {   
        
        if(loginedAccount.Logining === false)
        {
            return navigate("/Home");
        }   

	}, [load]);

	
	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(ProductData.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(ProductData.length / itemsPerPage));
		
	}, [itemOffset, itemsPerPage, ProductData]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % ProductData.length;
		console.log(
		  `User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	const loadProduct = () => {

		favlistService.GetAllFavList(loginedAccount.Account.UserID)
		.then(response => {   
		   console.log(response.data)
		   if(response.data[0] !== "NO FavList")
		   {
			
				var list = []
				response.data.forEach(element => {
					list.push(element.ProductID)
				});
				var data = {

					List : list.join(",")
				}
				
				ProductService.GetAllProductFromList(data)
				.then(response2 => {       	
					console.log(response2.data)
					setProductData(response2.data)
				})
				
				.catch(e => {
					console.log(e);
				});
			
			}
		 
		})   
		.catch(e => {
			console.log(e);
		});

		
    }
	
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="glasses">
						<div className="container">
							<div className="row">
								<div className="col-md-10 offset-md-1">
									<div className="titlepage">
										<h2>Our Shirt</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor
											e et dolore magna aliqua. Ut enim ad minim veniam, qui
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="container-fluid">
							<div className="row">                        
								<Products currentItems={currentItems} favList={true} reloadData={() => loadProduct()}/>

								{ProductData.length > 4 ? 							

									<ReactPaginate
										breakLabel="..."									
										nextLabel="Next Page >"
										onPageChange={handlePageClick}
										breakClassName={"break-me"}
										pageRangeDisplayed={5}
										pageCount={pageCount}
										previousLabel="< Pervious Page"
										renderOnZeroPageCount={null}
										containerClassName={"pagination"}
										subContainerClassName={"pages pagination"}						
										activeClassName={"active"}
									/>

								: null}
														
	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FavouriteList;