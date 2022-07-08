import React, { useState, useRef, useMemo, useCallback} from 'react';
import LoginService from "../services/LoginService";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import Dialog from "@material-ui/core/Dialog";
import Select from 'react-select'

const UserTable = ({Data, update})  =>{ 
	
    const gridRef = useRef();   
    const [columnDefs, setColumnDefs] = useState([
      {field: 'UserName', filter: true},
      {field: 'Email', filter: true},
      {field: 'Role', filter: true},
      {field: 'verification', filter: true}
    ]);
  
    const Ootion = [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' }
    ]
  

    const [RoleOption, setRoleOption] = useState(Ootion) 

    const [defaultEditItemUserName, setdefaultEditItemUserName] = useState("") 
    const [defaultEditItemUserID, setdefaultEditItemUserID] = useState(0) 
    const [defaultEditItemRole, setdefaultEditItemRole] = useState(RoleOption[0])
    const [defaultEditItemRole2, setdefaultEditItemRole2] = useState(RoleOption[0]) 
    const [defaultEditItemEmail, setdefaultEditItemEmail] = useState("") 
    const [UpdateUserDialogShow, setUpdateUserDialogShow] = useState(false) 

    const defaultColDef = useMemo( ()=> ({
        sortable: true,        
        maintainColumnOrder: true
        
      }));
   

    const cellClickedListener = useCallback( event => {
      setdefaultEditItemUserName(event.data.UserName) 
      RoleOption.forEach((option, i) => {
        if(option.value === event.data.Role)
        {
          setdefaultEditItemRole(RoleOption[i])
        }

      })     
      setdefaultEditItemRole2(event.data.Role)
      setdefaultEditItemEmail(event.data.Email)
      setdefaultEditItemUserID(event.data.UserID)
      setUpdateUserDialogShow(true)
    }, []);
    
    const saveUser = (item) => {

      var Update = {
        UserID: defaultEditItemUserID,
        UserName: defaultEditItemUserName,
        Role: defaultEditItemRole2,
        Email: defaultEditItemEmail,      
        verification : 1
      }; 

      LoginService.UpdateAccount(defaultEditItemUserID, Update)
			.then(response => {        	
				setUpdateUserDialogShow(false)
        update()			
			})
			.catch(e => {
				console.log(e);
			});
    }
    

  
	return (
		<div>
		    <div className="container-fluid">
                <div className="row">

                    
                    <div className="ag-theme-alpine" style={{width: 820, height: 500}}>
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
                    
                    <Dialog open={UpdateUserDialogShow}>
                      <div className="form-structor">	
                        <div className="exit-btn" onClick={() => setUpdateUserDialogShow(false)}>X</div>		
                        <div className="signup">
                          <div className="center">
                            <h2 className="form-title" id="login">Edit User</h2>                            
                            <div className="form-holder">					
                              <input type="text" readOnly="readonly" className="input"  placeholder="UserName" value={defaultEditItemUserName} onChange={(e)=>{ setdefaultEditItemUserName(e.target.value) }}/><br />                    
                              <input type="text" readOnly="readonly" className="input"  placeholder="Role " value={defaultEditItemEmail} onChange={(e)=>{ setdefaultEditItemEmail(e.target.value) }}/><br />
                              <Select  className="input" options={RoleOption} defaultValue={defaultEditItemRole} onChange={(e) => setdefaultEditItemRole2(e.value)}/>
                                                          				
                            </div>
                            <div className="form-holder2">					
                                                        				
                            </div>
                           
                            <button className="submit-btn" onClick={(e) => saveUser(e)}>Save</button>
                            <button className="submit-btn" onClick={(e) => setUpdateUserDialogShow(false)}>Cancel</button>
                          </div>
                        </div>
                      </div>
                      
                    </Dialog>
                   
                </div>
            </div>
		</div>
	);
}

export default UserTable;