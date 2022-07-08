import React, { useEffect, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/page.css';
import '../../style/style.css';
import {UserContext} from "../../App.js";
import ProductService from "../../services/ProductService";
import ReactPaginate from 'react-paginate';
import Products from "../Products.component";
//import {UserContext} from "../App.js";



const ProductList = ()  =>{ 
	
	const [load, setload]= useState(false);
	const loginedAccount = useContext(UserContext);
	const [currentItems, setCurrentItems] = useState(null);
    const [ProductData, setProductData] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	 // following the API or data you're working with.
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
    
        ProductService.GetAllProduct()
        .then(response => {       	
            console.log(response.data)
            setProductData(response.data)
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
										<p>Our clothes are made in different countries, 
										the quality of the products is guaranteed and there are different styles and colors to choose from.  Welcome to buy on this online platform.
										</p>
									</div>
								</div>
							</div>
						</div>
						
						<div className="container-fluid">
							<div className="row">                        
								<Products currentItems={currentItems} favList={false} reloadData={() => loadProduct()}/>

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
	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductList;