import React, { useState, useRef, useMemo, useCallback, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ProductService from "../services/ProductService";
import FileService from "../services/FileService";
import { Switch } from 'pretty-checkbox-react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import '@djthoms/pretty-checkbox';
import "../style/checkbox.css"
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import Dialog from "@material-ui/core/Dialog";
import Select from 'react-select'
import FileUpload from './FileUpload.component'
import DeleteRecordDialog from "./Dialog/DeleteRecordDialog.component";

const ProductTable = ({Data, update})  =>{ 
	
    
    const [UpdateProductDialogShow, setUpdateProductDialogShow] = useState(false) 
    const [CreateProductDialogShow, setCreateProductDialogShow] = useState(false) 

    const [defaultEditItemProductID, setdefaultEditItemProductID] = useState(0) 
    const [file, setfile] = useState()
    const [preview, setPreview] = useState()

    const Option = [
      { value: 'sell', label: 'Sell' },
      { value: 'notReady', label: 'Not Ready' }
    ] 
    const [ProductStatus, setProductStatus] = useState(Option) 

    const TypeOption = [
      { value: 'T-Shirt', label: 'T-Shirt' },
      { value: 'Jacket', label: 'Jacket' },
      { value: 'Long-Shirt', label: 'Long-Shirt' },
      { value: 'Hoodie', label: 'Hoodie' }
    ] 
    const [ProductType, setProductType] = useState(TypeOption) 

    const [defaultEditItemName, setdefaultEditItemName] = useState("") 
    const [defaultEditItemType, setdefaultEditItemType] = useState(ProductType[0])
    const [defaultEditItemType2, setdefaultEditItemType2] = useState("T-Shirt")
    const [defaultEditItemDescription, setdefaultEditItemDescription] = useState("") 
    const [defaultEditItemProductionPlace, setdefaultEditItemProductionPlace] = useState("") 
    const [defaultEditItemBrand, setdefaultEditItemBrand] = useState("") 
    const [defaultEditItemPrice, setdefaultEditItemPrice] = useState("") 

    const [defaultEditItemStatus, setdefaultEditItemStatus] = useState(ProductStatus[0]) 
    const [defaultEditItemStatus2, setdefaultEditItemStatus2] = useState("sell")    
    const [defaultEditItemImageName, setdefaultEditItemImageName] = useState("test.jpg") 

    const [EditItemPage, setEditItemPage] = useState(1) 

    const [ConfirmDeleteUI, setConfirmDeleteUI] = useState(false);
    const [DialogTitle, setDialogTitle] = useState("");
    const [Message, setMessage] = useState(""); 

    useEffect(() => {
    
      if(file)
      {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        setdefaultEditItemImageName(file.name)
        setImagePath(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
      }
     
  }, [file])

    const [defaultEditItemXSsize, setdefaultEditItemXSsize] = useState(false) 
    const [defaultEditItemSsize, setdefaultEditItemSsize] = useState(false) 
    const [defaultEditItemMsize, setdefaultEditItemMsize] = useState(false) 
    const [defaultEditItemLsize, setdefaultEditItemLsize] = useState(false) 
    const [defaultEditItemXLsize, setdefaultEditItemXLsize] = useState(false) 
    const [defaultEditItemXXLsize, setdefaultEditItemXXLsize] = useState(false) 
    const [imagePath, setImagePath] = useState("")
    const gridRef = useRef();   
    const [columnDefs, setColumnDefs] = useState([
      {field: 'Name', filter: true, width:150, ailgn: "center"},
      {field: 'Type', filter: true, width:150, ailgn: "center"},
      {field: 'Description', filter: true, width:150},
      {field: 'ProductionPlace', filter: true, width:200},
      {field: 'Brand', filter: true, width:150},
      {field: 'Price', filter: true, width:100},
      {field: 'XS', filter: true, width:80},
      {field: 'S', filter: true, width:80},
      {field: 'M', filter: true, width:80},
      {field: 'L', filter: true, width:80},
      {field: 'XL', filter: true, width:80},
      {field: 'XXL', filter: true, width:80},
      {field: 'status', filter: true, width:100}
    ]);  

    const defaultColDef = useMemo( ()=> ({
        sortable: true,        
        maintainColumnOrder: true
        
    }), []);
   

    const cellClickedListener = useCallback( event => {
        setUpdateProductDialogShow(true)      
        console.log(event.data)
        
        setdefaultEditItemProductID(event.data.ProductID)
        setdefaultEditItemName(event.data.Name)
        //setdefaultEditItemType(event.data.Type)
        setdefaultEditItemDescription(event.data.Description)
        setdefaultEditItemProductionPlace(event.data.ProductionPlace)
        setdefaultEditItemBrand(event.data.Brand)
        setdefaultEditItemPrice(event.data.Price)

        setdefaultEditItemXSsize(event.data.XS === 1? true : false)
        setdefaultEditItemSsize(event.data.S === 1? true : false)
        setdefaultEditItemMsize(event.data.M === 1? true : false)
        setdefaultEditItemLsize(event.data.L === 1? true : false)
        setdefaultEditItemXLsize(event.data.XL === 1? true : false)
        setdefaultEditItemXXLsize(event.data.XXL === 1? true : false)        
        setdefaultEditItemStatus2(event.data.status)
        setdefaultEditItemType2(event.data.Type)
        setImagePath("http://localhost:7000/images/" + event.data.ProductImage)  
        setPreview("http://localhost:7000/images/" + event.data.ProductImage)
        
        ProductStatus.forEach((option, i) => {
          if(option.value === event.data.status)
          {
            setdefaultEditItemStatus(ProductStatus[i])
          }
  
        }) 

        ProductType.forEach((option, i) => {
          if(option.value === event.data.Type)
          {
            setdefaultEditItemType(ProductType[i])
          }
  
        }) 

        setdefaultEditItemImageName(event.data.ProductImage)

    }, []);

    const closeEditUI = () =>{

        setUpdateProductDialogShow(false)
        setCreateProductDialogShow(false)
        setEditItemPage(1)
        setdefaultEditItemProductID(0)
        setdefaultEditItemName("")
        setdefaultEditItemType("")
        setdefaultEditItemDescription("")
        setdefaultEditItemProductionPlace("")
        setdefaultEditItemBrand("")
        setdefaultEditItemPrice("")
        setImagePath("")
        setdefaultEditItemXSsize(false)
        setdefaultEditItemSsize(false)
        setdefaultEditItemMsize(false)
        setdefaultEditItemLsize(false)
        setdefaultEditItemXLsize(false)
        setdefaultEditItemXXLsize(false)
        
        setdefaultEditItemStatus(ProductStatus[0])
        setdefaultEditItemType(ProductType[0])
        setdefaultEditItemStatus2("sell")
        setdefaultEditItemType2("sell")
        setdefaultEditItemImageName("test.jpg")

        
        setfile(undefined)
    }

  

    const saveProduct = (item) => {

      var Update = {
        ProductID: defaultEditItemProductID,
        Name: defaultEditItemName,
        Type: defaultEditItemType2,
        Description: defaultEditItemDescription,  
        ProductionPlace: defaultEditItemProductionPlace,       
        Brand : defaultEditItemBrand,
        Price: defaultEditItemPrice, 
        XS: defaultEditItemXSsize,
        S: defaultEditItemSsize,  
        M: defaultEditItemMsize,  
        L: defaultEditItemLsize,  
        XL: defaultEditItemXLsize,  
        XXL: defaultEditItemXXLsize,  
        status: defaultEditItemStatus2,  
        ProductImage : defaultEditItemImageName
      }; 
      
      uploadFile()
      console.log(Update)
      ProductService.UpdateProduct(defaultEditItemProductID, Update)
			.then(response => {        	
				closeEditUI()
        update()			
			})
			.catch(e => {
				console.log(e);
			});
     
    }

    const DeleteProduct = () =>{

      setDialogTitle("Delete Confirm?")
      setMessage("Confirm to Delete Product : " + defaultEditItemName + "?")
      setConfirmDeleteUI(true)

    }

    const CreateProduct = (item) => {

      var Update = {      
        Name: defaultEditItemName,
        Type: defaultEditItemType2,
        Description: defaultEditItemDescription,  
        ProductionPlace: defaultEditItemProductionPlace,       
        Brand : defaultEditItemBrand,
        Price: defaultEditItemPrice, 
        XS: defaultEditItemXSsize,
        S: defaultEditItemSsize,  
        M: defaultEditItemMsize,  
        L: defaultEditItemLsize,  
        XL: defaultEditItemXLsize,  
        XXL: defaultEditItemXXLsize,  
        status: defaultEditItemStatus2,  
        ProductImage : defaultEditItemImageName
      }; 
      
      uploadFile()
      ProductService.CreateProduct(Update)
			.then(response => {
                 	
				closeEditUI()
        update()			
			})
			.catch(e => {
				console.log(e);
			});
     
    }

    const deleteConfirm = () =>{
      console.log(defaultEditItemProductID)
      ProductService.DeleteProduct(defaultEditItemProductID)
			.then(response => {       
        update()
        setConfirmDeleteUI(false)
        closeEditUI()			
			})
			.catch(e => {
				console.log(e);
			});
   
    }
    
    const uploadFile = () => {      
      const data = new FormData() 
      data.append('file', file)
      
      FileService.UploadImage(data)
      .then(response => {        	
          
          
      })
      .catch(e => {
          console.log(e);
      });
    };
	return (
		<div>
     
		    <div className="container-fluid">
                <div className="row">

                    <Button variant="primary" onClick={() => setCreateProductDialogShow(true)}>Add new Product</Button>{' '}
                    <div className="ag-theme-alpine" style={{width: 1530, height: 550}}>
                    <br />
                      <AgGridReact
                        ref={gridRef} // Ref for accessing Grid's API

                        rowData={Data} // Row Data for Rows
                        
                        columnDefs={columnDefs} // Column Defs for Columns
                        defaultColDef={defaultColDef} // Default Column Properties

                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                        rowSelection='single' // Options - allows click selection of rows

                        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                        
                        pagination={true} 
                        paginationPageSize={10}
                        />
                    </div>

                    <Dialog open={UpdateProductDialogShow}>
                      <div className="form-structor2">	
                      <div className="exit-btn" onClick={() => closeEditUI()}>X</div>		
                        <div className="signup">
                          <div className="center">
                            <h2 className="form-title" id="login">Edit Product</h2> 
                            {EditItemPage === 1?                               
                              <div className="form-holder" >					
                                  <input type="text" className="input"  placeholder="Name" value={defaultEditItemName} onChange={(e)=>{ setdefaultEditItemName(e.target.value) }} />                  
                                  <Select  className="input" options={ProductType} defaultValue={defaultEditItemType} onChange={(e) => setdefaultEditItemType2(e.value)}/>   
                                  <input type="text" className="input"  placeholder="Description" value={defaultEditItemDescription} onChange={(e)=>{ setdefaultEditItemDescription(e.target.value) }}/>
                                  <input type="text" className="input"  placeholder="Production Place" value={defaultEditItemProductionPlace} onChange={(e)=>{ setdefaultEditItemProductionPlace(e.target.value) }}/>
                                  <input type="text" className="input"  placeholder="Brand" value={defaultEditItemBrand} onChange={(e)=>{ setdefaultEditItemBrand(e.target.value) }}/> 
                                  <input type="number" className="input"  placeholder="Price" value={defaultEditItemPrice} onChange={(e)=>{ setdefaultEditItemPrice(e.target.value) }}/>                   				
                              </div>                                   
                              :                                
                                null                                                                   
                            }

                            {EditItemPage === 2 ?  <div className="form-holder" >					
                                
                                <FileUpload className="input" setfile={(e) => setfile(e)} image={file? file.name : ""}/>
                              </div> : null}

                              {EditItemPage === 3 ?  <div >					
                                {imagePath !== ""? <img width="390" className="file" src={preview} alt="ProductImage" /> : null}
                              </div> : null}
                            {EditItemPage === 4? <div className="form-holder">
                                <p className="label">Size : </p>
                                <Switch shape="fill" className="input2" state={defaultEditItemXSsize} setState={setdefaultEditItemXSsize} onChange={() => setdefaultEditItemXSsize(!defaultEditItemXSsize)}>xs</Switch>
                                <Switch shape="fill" className="input2" state={defaultEditItemSsize} setState={setdefaultEditItemSsize} onChange={() => setdefaultEditItemSsize(!defaultEditItemSsize)}>s</Switch>	
                                <Switch shape="fill" className="input2" state={defaultEditItemMsize} setState={setdefaultEditItemMsize} onChange={() => setdefaultEditItemMsize(!defaultEditItemMsize)}>M</Switch>	
                                <Switch shape="fill" className="input2" state={defaultEditItemLsize} setState={setdefaultEditItemLsize} onChange={() => setdefaultEditItemLsize(!defaultEditItemLsize)}>L</Switch>	
                                <Switch shape="fill" className="input2" state={defaultEditItemXLsize} setState={setdefaultEditItemXLsize} onChange={() => setdefaultEditItemXLsize(!defaultEditItemXLsize)}>XL</Switch>	
                                <Switch shape="fill"className="input2" state={defaultEditItemXXLsize} setState={setdefaultEditItemXXLsize} onChange={() => setdefaultEditItemXXLsize(!defaultEditItemXXLsize)}>XXL</Switch>				
                                <Select  className="input" options={ProductStatus} defaultValue={defaultEditItemStatus} onChange={(e) => setdefaultEditItemStatus2(e.value)}/>                      
                            </div> : null
                            }  
                                                        
                            {EditItemPage === 1?
                                <div>                                 
                                    <button className="submit-btn" onClick={() => setEditItemPage(2)}>Next</button>
                                    <button className="submit-btn" onClick={(e) => saveProduct(e)}>Save</button>  
                                    <button className="submit-btn" onClick={(e) => DeleteProduct(e)}>Delete</button>  
                                </div>
                              :
                                null                             
                            }

                            {EditItemPage === 2 ? 
                              <div>                                    
                                {imagePath !== ""?<button className="submit-btn" onClick={() => setEditItemPage(3)}>Next</button> : null}
                                <button className="submit-btn" onClick={() => setEditItemPage(1)}>Pervious</button>  
                                <button className="submit-btn" onClick={(e) => saveProduct(e)}>Save</button>   
                                <button className="submit-btn" onClick={(e) => DeleteProduct(e)}>Delete</button>                                   
                              </div>  : null
                            }
                            {EditItemPage === 3 ? 
                              <div>                                    
                                <button className="submit-btn" onClick={() => setEditItemPage(4)}>Next</button>
                                <button className="submit-btn" onClick={() => setEditItemPage(2)}>Pervious</button>  
                                <button className="submit-btn" onClick={(e) => saveProduct(e)}>Save</button>  
                                <button className="submit-btn" onClick={(e) => DeleteProduct(e)}>Delete</button>                                    
                              </div>  : null
                            }

                            {EditItemPage === 4? 
                              <div>   
                                <button className="submit-btn" onClick={(e) => saveProduct(e)}>Save</button>   
                                <button className="submit-btn" onClick={() => setEditItemPage(3)}>Pervious</button>                                      
                                <button className="submit-btn" onClick={(e) => DeleteProduct(e)}>Delete</button>                         
                              </div>  : null
                            }
                            
                          </div>
                        </div>
                      </div>                      
                    </Dialog>

                    

                    
                    <Dialog open={CreateProductDialogShow}>
                      <div className="form-structor2">	
                      <div className="exit-btn" onClick={() => closeEditUI()}>X</div>		
                        <div className="signup">
                          <div className="center">
                            <h2 className="form-title" id="login">New Product</h2> 
                            {EditItemPage === 1?                               
                              <div className="form-holder" >					
                                  <input type="text" className="input"  placeholder="Name" value={defaultEditItemName} onChange={(e)=>{ setdefaultEditItemName(e.target.value) }} />                  
                                  <Select  className="input" options={ProductType} defaultValue={defaultEditItemType} onChange={(e) => setdefaultEditItemType2(e.value)}/> 
                                  <input type="text" className="input"  placeholder="Description" value={defaultEditItemDescription} onChange={(e)=>{ setdefaultEditItemDescription(e.target.value) }}/>
                                  <input type="text" className="input"  placeholder="Production Place" value={defaultEditItemProductionPlace} onChange={(e)=>{ setdefaultEditItemProductionPlace(e.target.value) }}/>
                                  <input type="text" className="input"  placeholder="Brand" value={defaultEditItemBrand} onChange={(e)=>{ setdefaultEditItemBrand(e.target.value) }}/> 
                                  <input type="number" className="input"  placeholder="Price" value={defaultEditItemPrice} onChange={(e)=>{ setdefaultEditItemPrice(e.target.value) }}/>                   				
                              </div>                                   
                              :                                
                                null                                                                   
                            }

                            {EditItemPage === 2 ?  <div className="form-holder" >					
                              <FileUpload className="input" setfile={(e) => setfile(e)} image={file? file.name : ""}/>
                              </div> : null}

                              {EditItemPage === 3 ?  <div className="form-holder" >					
                              {imagePath !== ""? <img width="390" className="file" src={preview} alt="ProductImage" /> : null}
                              </div> : null}

                            {EditItemPage === 4? <div className="form-holder">
                                    <p className="label">Size : </p>
                                    <Switch shape="fill" className="input2" state={defaultEditItemXSsize} setState={setdefaultEditItemXSsize} onChange={() => setdefaultEditItemXSsize(!defaultEditItemXSsize)}>xs</Switch>
                                    <Switch shape="fill" className="input2" state={defaultEditItemSsize} setState={setdefaultEditItemSsize} onChange={() => setdefaultEditItemSsize(!defaultEditItemSsize)}>s</Switch>	
                                    <Switch shape="fill" className="input2" state={defaultEditItemMsize} setState={setdefaultEditItemMsize} onChange={() => setdefaultEditItemMsize(!defaultEditItemMsize)}>M</Switch>	
                                    <Switch shape="fill" className="input2" state={defaultEditItemLsize} setState={setdefaultEditItemLsize} onChange={() => setdefaultEditItemLsize(!defaultEditItemLsize)}>L</Switch>	
                                    <Switch shape="fill" className="input2" state={defaultEditItemXLsize} setState={setdefaultEditItemXLsize} onChange={() => setdefaultEditItemXLsize(!defaultEditItemXLsize)}>XL</Switch>	
                                    <Switch shape="fill"className="input2" state={defaultEditItemXXLsize} setState={setdefaultEditItemXXLsize} onChange={() => setdefaultEditItemXXLsize(!defaultEditItemXXLsize)}>XXL</Switch>				
                                    <Select  className="input" options={ProductStatus} defaultValue={defaultEditItemStatus} onChange={(e) => setdefaultEditItemStatus2(e.value)}/>                      
                                </div> : null
                            }  
                                                        
                            {EditItemPage === 1?
                                <div>                                 
                                    <button className="submit-btn" onClick={() => setEditItemPage(2)}>Next</button>                                   
                                </div>
                              :
                                null                             
                            }

                            {EditItemPage === 2? 
                              <div>                                    
                                {imagePath !== ""?<button className="submit-btn" onClick={() => setEditItemPage(3)}>Next</button> : null}
                                <button className="submit-btn" onClick={() => setEditItemPage(1)}>Pervious</button>  
                                                                 
                              </div>  : null
                            }
                             {EditItemPage === 3? 
                              <div>                                    
                                <button className="submit-btn" onClick={() => setEditItemPage(4)}>Next</button>
                                <button className="submit-btn" onClick={() => setEditItemPage(2)}>Pervious</button>  
                                                                 
                              </div>  : null
                            }


                            {EditItemPage === 4? 
                              <div>   
                                <button className="submit-btn" onClick={(e) => CreateProduct(e)}>Save</button>
                                <button className="submit-btn" onClick={() => setEditItemPage(3)}>Pervious</button>  
                              </div>  : null
                            }
                            
                          
                          </div>
                        </div>
                      </div>                      
                    </Dialog>

                    <DeleteRecordDialog showDialog={ConfirmDeleteUI} title={DialogTitle} content={Message} closeUI={() => setConfirmDeleteUI(false)} deleteRecord={() => deleteConfirm()}/>                  
                    
                </div>
            </div>
		</div>
	);
}

export default ProductTable;