import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../App.css';
import "../../style/login.scss"
import Dialog from "@material-ui/core/Dialog";
const DeleteRecordDialog = ({showDialog, content, title, closeUI, deleteRecord})  =>{ 
	
	return (
		<div>	
            <Dialog open={showDialog}>
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLongTitle"><b>{title}</b></h5>					
				</div>
				<div className="modal-body">
					{content}
				</div>
				<div className="modal-footer">					
					<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deleteRecord()}>Delete</button>
					<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => closeUI()}>Close</button>
				</div>
			</div>
			</Dialog>
			
		</div>
	);
}

export default DeleteRecordDialog;