import React, {  useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import LoginService from "../services/LoginService";
import MessageDialog from "./Dialog/MessageDialog.component";
//import {UserContext} from "../App.js";
import {UserContext2} from "./Login.component";


const Verify = ({ResentCode, ToLogin, loginSuccess})  =>{ 
	
    const [VerifyCode, setVerifyCode] = useState("");
	const [VerifyFailUI, setVerifyFailUI] = useState(false);

	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 
	//const user = useContext(UserContext);
	const userid = useContext(UserContext2);
	useEffect(() => {   
	
	});

	const ReSendEmail = () =>{

		const Logined = {
			UserID: userid.UserID.UserID,
			UserName: userid.UserID.UserName,
			Role: userid.UserID.Role,
			Email: userid.UserID.Email,
			Verificationcode:userid.UserID.Verificationcode,
			verification:userid.UserID.verification
		};
		
		console.log(Logined.UserID)
		LoginService.RegenerateCode(Logined)
		.then(response => {        
			Logined.Verificationcode = response.data;
			ResentCode(Logined);
			LoginService.SendEmail(Logined)
			.then(response => { 
				
				setDialogTitle("Email sent")
				setMessage("Verification Code was sent to your email! Please check it!")
				setVerifyFailUI(true)
				
			})
			.catch(e => {
				console.log(e);
			});	
			
		})
		.catch(e => {
			console.log(e);
		})

				
	}
	
	const VerifyEmail = () =>{
		

		if(VerifyCode === "" )
		{
			setDialogTitle("Verify Fail!")
			setMessage("Please Input Verify Code!")
			setVerifyFailUI(true)
		}
		else 
		{

			var data = {

				UserID: userid.UserID.UserID,
				Code: VerifyCode
			}
			LoginService.VerifyCode(data)
			.then(response => {        
				if(response.data[0] !== "Fail")
				{	
					const Logined = {
						UserID: userid.UserID.UserID,
						UserName: userid.UserID.UserName,
						Role: userid.UserID.Role,
						Email: userid.UserID.Email,
						Verificationcode:userid.UserID.Verificationcode,
						verification:1
					};

					LoginService.UpdateAccount(userid.UserID.UserID, Logined)
					.then(response => {        
						loginSuccess(Logined)
					})
					.catch(e => {
						console.log(e);
					});	

					setDialogTitle("Verify Success!")
					setMessage("Verify Success!")
					setVerifyFailUI(true)
				}
				else
				{	
					setDialogTitle("Verify Fail!")
					setMessage("Wrong Verify Code. Please Verify Again!")
					setVerifyFailUI(true)
				}
				
			})
			.catch(e => {
				console.log(e);
			});	
		
		}

		
	}
	
	const closeDialog = () => {

		setVerifyFailUI(false)
	}

	return (
		<div>
			<div className="form-structor">	
				<div className="exit-btn" onClick={() => ToLogin()}>X</div>		
				<div className="signup">
					<div className="center">
						<h2 className="form-title" id="login">Enter Verify Code</h2>
						<p className="Title" >The Veritfy Code was sent to your Email. Please check it.</p>
						<div className="form-holder">					
							<input type="text" className="input" placeholder="Verify Code" value={VerifyCode} onChange={(e)=>{ setVerifyCode(e.target.value) }}/>						
						</div>
						<button className="submit-btn" onClick={(e) => VerifyEmail(e)}>Verify</button>
						<p className="Title" >Did not recieve email? <button className="submit-btn" onClick={(e) => ReSendEmail(e)}>Send again</button></p>
					</div>
				</div>
			</div>

			<MessageDialog showDialog={VerifyFailUI} title={DialogTitle} content={Message} closeUI={() => closeDialog()}/>
		</div>
	);
}

export default Verify;
