import React, {  useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import LoginService from "../services/LoginService";
import MessageDialog from "./Dialog/MessageDialog.component";
import Dialog from "@material-ui/core/Dialog";
const ResetPassword = ({closeUI})  =>{ 

    const [DialogShow, setDialogShow] = useState(false);
    const [DialogShow2, setDialogShow2] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 
    const [resetUserID, setresetUserID] = useState(""); 	

    const [Step, setStep] = useState(1);

    const [Email, setEmail]  = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");
    const [VerifyCode, setVerifyCode] = useState("");



	useEffect(() => {   
	
	});

    const ChangePassword = () =>{

        if(Password === "")
        {
            setDialogTitle("Reset Fail")
            setMessage("Please input new Password.")
            setDialogShow(true)
        }
        else if(PasswordConfirm === "")
        {
            setDialogTitle("Reset Fail")
            setMessage("Please input Confirm Password.")
            setDialogShow(true)
        }
        else if(PasswordConfirm !== Password)
        {
            setDialogTitle("Reset Fail")
            setMessage("New Password and Confirm Password are not same.")
            setDialogShow(true)
        }
        else
        {   

            LoginService.UpdatePassword(resetUserID, {Password : Password})
			.then(response => {     
				LoginService.ResetSuccessUpdate({UserID:resetUserID})
				.then(response => {   
					

				})
				.catch(e => {
					console.log(e);
				})   	
				setDialogTitle("Reset Success")
                setMessage("Now you can use new password to login JackStyle.")
                setDialogShow2(true)
             		
			})
			.catch(e => {
				console.log(e);
			});
        }
    }

    const closeDialog = () => {

		setDialogShow(false)
	}

    const VerifyEmail = () =>{
        
        if(Email !== "")
        {
            var data = {
                email : Email
            }
    
            LoginService.FindAccount(data)
            .then(response => {        
                console.log(response.data)
                if(response.data[0] === "Did not have this user.")
                {
                    setDialogTitle("This email has not been registed.")
                    setMessage("Please input the correct email.")
                    setDialogShow(true)
                }
                else
                {
                    sendVerificationcode(response)
    
                }
    
            })
            .catch(e => {
                console.log(e);
            })
        }
        
    }

    const Verify = () =>{
		

		if(VerifyCode === "" )
		{
			setDialogTitle("Verify Fail!")
			setMessage("Please Input Verify Code!")
			setDialogShow(true)
		}
		else 
		{
            var data = {

				UserID: resetUserID,
				Code: VerifyCode
			}
			LoginService.VerifyCodeForResetPassword(data)
			.then(response => {        

				if(response.data[0] === "Success")
				{	
					setStep(3)
				}
				else
				{	
					setDialogTitle("Verify Fail!")
					setMessage("Wrong Verify Code. Please Verify Again!")
					setDialogShow(true)
				}
				
			})
			.catch(e => {
				console.log(e);
			});	
		
		}

		
	}

    const sendVerificationcode = (res) => {

        var data = {
            UserID: res.data[0].UserID,           
            Email: res.data[0].Email,
            UserName: res.data[0].UserName
        };
        console.log(data)
        LoginService.generateVerificationcodeForResetPassword(data)
		.then(response => {   
            console.log("Code" + response.data)
            setresetUserID(res.data[0].UserID)
            data = {
                UserID: res.data[0].UserID,           
                Email: res.data[0].Email,
                UserName: res.data[0].UserName,
                Verificationcode: response.data
            };
            setStep(2)
			LoginService.SendEmailForResetPassword(data)
			.then(response => { 
				
				
				
			})
			.catch(e => {
				console.log(e);
			});	
			

		})
		.catch(e => {
			console.log(e);
		})

    }

    const backToMainPage = () => {

        setDialogShow2(false)
        closeUI()
    }
	

	return (
		<div>
            <Dialog open={true}>
			{Step === 1? <div className="form-structor">	
				<div className="exit-btn" onClick={() => closeUI()}>X</div>		
				<div className="signup">
					<div className="center">
						<h2 className="form-title" id="login">Forgot Password?</h2>
						<p className="Title" >Please Input your registed email.</p>
						<div className="form-holder">					
							<input type="text" className="input" placeholder="Email" value={Email} onChange={(e)=>{ setEmail(e.target.value) }}/>						
						</div>
						<button className="submit-btn" onClick={(e) => VerifyEmail(e)}>Verify</button>						
					</div>
				</div>
			</div> : null}

            {Step === 2? <div className="form-structor">	
				<div className="exit-btn" onClick={() => closeUI()}>X</div>		
				<div className="signup">
					<div className="center">
						<h2 className="form-title" id="login">Enter Verify Code</h2>
						<p className="Title" >The Veritfy Code was sent to your Email. Please check it.</p>
						<div className="form-holder">					
							<input type="text" className="input" placeholder="Verify Code" value={VerifyCode} onChange={(e)=>{ setVerifyCode(e.target.value) }}/>						
						</div>
						<button className="submit-btn" onClick={() => Verify()}>Verify</button>
						<p className="Title" >Did not recieve email? <button className="submit-btn" onClick={() => VerifyEmail()}>Send again</button></p>
					</div>
				</div>
			</div> : null}

            {Step === 3? <div className="form-structor">	
				<div className="exit-btn" onClick={() => closeUI()}>X</div>		
				<div className="signup">
					<div className="center">
						<h2 className="form-title" id="login">Enter Verify Code</h2>
						<p className="Title" >The Veritfy Code was sent to your Email. Please check it.</p>
						<div className="form-holder">					
							<input type="text" className="input" placeholder="NewPassword" value={Password} onChange={(e)=>{ setPassword(e.target.value) }}/>
                            <input type="text" className="input" placeholder="New Password Confirm" value={PasswordConfirm} onChange={(e)=>{ setPasswordConfirm(e.target.value) }}/>						
						</div>
						<button className="submit-btn" onClick={(e) => ChangePassword(e)}>Reset</button>						
					</div>
				</div>
			</div> : null}
            </Dialog>
			<MessageDialog showDialog={DialogShow} title={DialogTitle} content={Message} closeUI={() => closeDialog()}/>
            <MessageDialog showDialog={DialogShow2} title={DialogTitle} content={Message} closeUI={() => backToMainPage()}/>
		</div>
	);
}

export default ResetPassword;
