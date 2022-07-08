import React, { useRef} from "react";
import "../style/login.scss"
import Button from "react-bootstrap/Button";
const FileUpload = ({setfile, image})  =>{ 	
    
    const uploadFileClick = useRef();
    const saveFile = (e) => {      
        setfile(e.target.files[0])
    };

	return (
		<div>            
            <input ref={uploadFileClick} hidden type="file" onChange={saveFile} />
		    <Button variant="primary" onClick={() => uploadFileClick.current.click()} className="input">
                Upload Image
            </Button> 
            {image !== "" ? <p className="label2">Image preview will show on next page</p> : null}
           
		</div>
	);
}

export default FileUpload;