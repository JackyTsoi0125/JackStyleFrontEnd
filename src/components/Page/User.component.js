import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/login.scss"
import '../../style/payment.css';
import "../../style/login.scss"
import '../../style/page2.css';
import '../../style/style.css';
import LoginService from "../../services/LoginService";
import MessageDialog from "../Dialog/MessageDialog.component";
import {UserContext} from "../../App.js";
import {useNavigate} from "react-router-dom";



const User = ()  =>{ 
	const loginedAccount = useContext(UserContext);
	const [UserName, setUserName] = useState("")
	const [UserID, setUserID] = useState("")
	const [Email, setEmail] = useState("")
	const [Password, setPassword] = useState("")
	const [OldPassword, setOldPassword] = useState("")
	const [ConfirmPassword, setConfirmPassword] = useState("")
	const [ResetPassword, setResetPassword] = useState(false)
	const [load, setload] = useState(false)
	const [ConfirmUI, setConfirmUI] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 
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
			setUserName(loginedAccount.Account.UserName)
			setEmail(loginedAccount.Account.Email)
			setUserID(loginedAccount.Account.UserID)
       		setload(true) 
		}		     

	}, [load]);

	const Save = () =>{

		if(UserName === null || UserName === "")
		{
			setDialogTitle("User Name Missing!")
            setMessage("Please input User Name")
            setConfirmUI(true)
            return false
		}

		if(ResetPassword)
		{
			if(OldPassword === null || OldPassword === "")
			{
				setDialogTitle("Current Password Missing!")
				setMessage("Please input Current Password")
				setConfirmUI(true)
				return false
			}
			if(Password === null || Password === "")
			{
				setDialogTitle("New Password Missing!")
				setMessage("Please input New Password")
				setConfirmUI(true)
				return false
			}
			if(ConfirmPassword === null || ConfirmPassword === "")
			{
				setDialogTitle("New Password Confirm Missing!")
				setMessage("Please input New Password Confirm")
				setConfirmUI(true)
				return false
			}
			LoginService.CheckPassword({password : OldPassword, UserID: UserID})
			.then(response => {  
				   console.log(response)
				if(response.data[0] !== "Same")
				{
					setDialogTitle("Wrong Password")
					setMessage("Please input correct password.")
					setConfirmUI(true)
					return false
				}
				else
				{
					if(ConfirmPassword !== Password)
					{
						setDialogTitle("New Password Not Match!")
						setMessage("Please input correct password.")
						setConfirmUI(true)
						return false
					}
					const Logined = {
						UserID:	UserID,
						UserName: UserName,
						Password:Password				
					};
			
					LoginService.UpdateAccount2(Logined)
					.then(response => {      
						const Logined2 = {
							UserID:	UserID,
							UserName: UserName,
							Role: loginedAccount.Account.Role,
							Email: loginedAccount.Account.Email,
							Verificationcode:loginedAccount.Account.Verificationcode,
							verification:loginedAccount.Account.verification
						};  
						
						setDialogTitle("Profile Update Success")
						setMessage("Now you can use new password to login JackStyle.")
						setConfirmUI(true)
						setOldPassword("")
						setPassword("")	
						setResetPassword(false)
						setConfirmPassword("")	
						loginedAccount.setAccount(Logined2)
						
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
		else
		{
			const Logined = {
				UserID:	UserID,
				UserName: UserName,
				Password:""				
			};
	
			LoginService.UpdateAccount2(Logined)
			.then(response => {      
				const Logined2 = {
					UserID:	UserID,
					UserName: UserName,
					Role: loginedAccount.Account.Role,
					Email: loginedAccount.Account.Email,
					Verificationcode:loginedAccount.Account.Verificationcode,
					verification:loginedAccount.Account.verification
				};  
				setDialogTitle("Profile Update Success")
				setMessage("Profile Update Success")
				setConfirmUI(true)
				setOldPassword("")
				setPassword("")	
				setResetPassword(false)
				setConfirmPassword("")	
				loginedAccount.setAccount(Logined2)
				
			})
			.catch(e => {
				console.log(e);
			});	
		}

		
		
	}

	return (
		
		<div className="container-fluid">
			<div className="row">
			<section className="h-100 gradient-custom">
					<div className="container py-5">
						<div className="row d-flex justify-content-center my-4">
							<div className="col-md-8">
						
								<div className="card mb-4">
									
									<div className="card-body">
										<div className="container p-0">
											<div className="card px-4">
												<p className="h8 py-3">Account Detail</p>
												<div className="row gx-3">
													<div className="col-12">
														<div className="d-flex flex-column">
															<p className="text mb-1">User Name</p>
															<input className="form-control mb-3" type="text"  placeholder="Name" value={UserName} onChange={(e)=>{ setUserName(e.target.value) }}/>
														</div>
													</div>												
													<div className="col-12">
														<div className="d-flex flex-column">
															<p className="text mb-1">Email</p>
															<input className="form-control mb-3" type="text" readOnly={true} placeholder="Email" value={Email} onChange={(e)=>{ setEmail(e.target.value) }}/>
														</div>
													</div>
													
													
													{ResetPassword ? 
													<>
														<div className="col-12">
															<div className="btn2 btn2-primary mb-3 button" onClick={() => setResetPassword(!ResetPassword)}>
																<span className="ps-3" >Change Password</span>
																<span className="fas fa-arrow-right"></span>
															</div>
														</div>
														<div className="col-12">
															<div className="d-flex flex-column">
																<p className="text mb-1">Current Password</p>
																<input className="form-control mb-3" type="password" placeholder="Current Password" value={OldPassword} onChange={(e)=>{ setOldPassword(e.target.value) }}/>
															</div>
														</div>
														<div className="col-12">
															<div className="d-flex flex-column">
																<p className="text mb-1">New Password</p>
																<input className="form-control mb-3" type="password" placeholder="New Password" value={Password} onChange={(e)=>{ setPassword(e.target.value) }}/>
															</div>
														</div>
														<div className="col-12">
															<div className="d-flex flex-column">
																<p className="text mb-1">New Password Confirm</p>
																<input className="form-control mb-3" type="password" placeholder="New Password Confirm" value={ConfirmPassword} onChange={(e)=>{ setConfirmPassword(e.target.value) }}/>
															</div>
														</div>
														
														<div className="col-12">
															<div className="btn2 btn2-primary mb-3 button" onClick={() => Save()}>
																<span className="ps-3"  onClick={() => Save()}>Save</span>
																<span className="fas fa-arrow-right"></span>
															</div>
														</div>
													</>
													: 
													<>
														<div className="col-6">
															<div className="btn2 btn2-primary mb-3 button" onClick={() => setResetPassword(!ResetPassword)}>
																<span className="ps-3" onClick={() => setResetPassword(!ResetPassword)}>Change Password</span>
																<span className="fas fa-arrow-right"></span>
															</div>
														</div>
														<div className="col-6">
															<div className="btn2 btn2-primary mb-3 button" onClick={() => Save()}>
																<span className="ps-3" onClick={() => Save()}>Save</span>
																<span className="fas fa-arrow-right"></span>
															</div>
														</div>
													</>
													}
												</div>
											</div>
										</div>
																		
										
									</div>								
								</div>		
								
							</div>						
						</div>
					</div>
				</section>

				
			</div>
			<MessageDialog showDialog={ConfirmUI} title={DialogTitle} content={Message} closeUI={() => setConfirmUI(false)}/>
		</div>

		
	);
}

export default User;