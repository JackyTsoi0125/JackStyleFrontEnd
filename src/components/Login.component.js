import React, {  useState, useEffect, createContext, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.scss"
import LoginService from "../services/LoginService";
import Verify from "./Verify.component";
import MessageDialog from "./Dialog/MessageDialog.component";

import Dialog from "@material-ui/core/Dialog";


export const UserContext2 = createContext();

const Login = ({login, closeUI, resetPassword})  =>{  
	
	const  [LoginUserName, setLoginUserName] = new useState("");
	const  [LoginPassword, setLoginPassword] = new useState("");
	const  [RegLoginName, setRegLoginName] = new useState("");
	const  [RegLoginPassword, setRegLoginPassword] = new useState("");
	const  [RegLoginPasswordAgain, setRegLoginPasswordAgain] = new useState("");
	const  [RegEmail, setRegEmail] = new useState("");
	const  [VeriftUI, setVeriftUI] = useState(false) 
	const  [LoginUI, setLoginUI] = useState(false) 

	const [VerifyFailUI, setVerifyFailUI] = useState(false);
	const [DialogTitle, setDialogTitle] = useState("");
	const [Message, setMessage] = useState(""); 


	var Logined = {
		UserID: 0,
		UserName: "",
		Role: "",
		Email: "",
		Verificationcode :"",
		verification : 0
		};

	const  [UserID, setUserID] = useState(Logined) 
	//const user = useContext(UserContext);

	useEffect(() => {   
		
	});

	
	const ac = useMemo(() => {
		return {
			UserID,
		 	setUserID,
		  	log: (t) => console.log(t)
		}
	  }, [UserID]);

	const LoginAccount = () => {   

		if(LoginUserName === "")
		{
			setDialogTitle("Login Fail!")
			setMessage("Please input your User Name or Email!")
			setVerifyFailUI(true)
		}
		else if(LoginPassword === "")
		{
			setDialogTitle("Login Fail!")
			setMessage("Please input your Password!")
			setVerifyFailUI(true)
		}
		else
		{
			LoginService.Login(LoginUserName, LoginPassword)
			.then(response => {        
				console.log(response.data);	
				if(response.data[0] === "Did not have this user.")
				{
					setDialogTitle("Login Fail!")
					setMessage(LoginUserName + " does not exist in system! Please check your email or username!")
					setVerifyFailUI(true)
				}
				else if (response.data === "Wrong Password")
				{
					setDialogTitle("Login Fail !")
					setMessage("Wrong Password ! Please input correct Password !")
					setVerifyFailUI(true)
				}
				else
				{
					
					const LoginedTest = {
						UserID: response.data[0].UserID,
						UserName: response.data[0].UserName,
						Role: response.data[0].Role,
						Email: response.data[0].Email,
						Verificationcode:response.data[0].Verificationcode,
						verification:response.data[0].verification
					};
					

					//console.log(Logined)
					if(response.data[0].verification === 0)
					{
						setUserID(LoginedTest)
						SendEmail(LoginedTest);
						setVeriftUI(1);		
					}
					else
					{				
						login(LoginedTest);
						
					}
				}
				
				
			})
			.catch(e => {
			

				console.log(e);
			});
		}

		
	};

	const CreateAccount = () => {   

		if(RegLoginName === "")
		{
			setDialogTitle("Sign up Fail !")
			setMessage("Please input your User Name!")
			setVerifyFailUI(true)
		}
		else if(RegEmail === "")
		{
			setDialogTitle("Sign up Fail !")
			setMessage("Please input your Email!")
			setVerifyFailUI(true)
		} 
		else if(RegLoginPassword === "")
		{
			setDialogTitle("Sign up Fail !")
			setMessage("Please input your Password!")
			setVerifyFailUI(true)
		} 
		else if(RegLoginPasswordAgain === "")
		{
			setDialogTitle("Sign up Fail !")
			setMessage("Please input your Password Again!")
			setVerifyFailUI(true)
		}
		else if(RegLoginPasswordAgain !== RegLoginPassword)
		{
			setDialogTitle("Sign up Fail !")
			setMessage("Your Password is not correct!")
			setVerifyFailUI(true)
		}
		else
		{
			const newAccount = {
				UserName: RegLoginName,
				Password: RegLoginPassword,
				Email: RegEmail,
				Verificationcode : ""
			};
			
			LoginService.CreateAccount(newAccount)
			.then(response => {        	
				
				if(response.data[0] === "Duplicate entry : UserName")
				{
					setDialogTitle("Sign up Fail !")
					setMessage(RegLoginName + " is already exists in system. Please use other User Name!")
					setVerifyFailUI(true)
				}
				else if(response.data[0] === "Duplicate entry : Email")
				{
					setDialogTitle("Sign up Fail !")
					setMessage("This email is already registered. Please use other Email!")
					setVerifyFailUI(true)
				}
				else
				{
					setDialogTitle("Sign up Success !")
					setMessage("Sign up success. You can try to login Now!")
					setVerifyFailUI(true)
				}
				
			})
			.catch(e => {
				console.log(e);
			});
		}

		
	};

	
	const SendEmail = (Logined) =>{
		
		LoginService.RegenerateCode(Logined)
		.then(response => {        
			Logined.Verificationcode = response.data;
			LoginService.SendEmail(Logined)
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



	const ToLogin = (event) => {

		if(!LoginUI)
		{
			let parent = event.target.parentNode.parentNode;
			// eslint-disable-next-line array-callback-return
			Array.from(event.target.parentNode.parentNode.classList).find((element) => {
				if(element !== "slide-up") {
					parent.classList.add('slide-up')
				}else{
					const signupBtn = document.getElementById('login');
					signupBtn.parentNode.classList.add('slide-up')
					parent.classList.remove('slide-up')
				}
			});

			setLoginUI(true)
	
		}
	
	}
	const ToSignUp =  (event) => {

		if(LoginUI)
		{
			let parent = event.target.parentNode;
			// eslint-disable-next-line array-callback-return
			Array.from(event.target.parentNode.classList).find((element) => {
				if(element !== "slide-up") {
					parent.classList.add('slide-up')
				}else{
					const loginBtn = document.getElementById('signup');
					loginBtn.parentNode.parentNode.classList.add('slide-up')
					parent.classList.remove('slide-up')
				}
			});		
			setLoginUI(false)
		}
		
	}   

	const loginSuccess = (Logined) => {

		setVeriftUI(false)
		login(Logined)
		closeUI(false)
	}

	return (

		
		<div className="Login">	

			<Dialog open={true}>		
			{ VeriftUI?  <UserContext2.Provider value={ac}> <Verify ResentCode={username => login(username)} ToLogin={() => setVeriftUI(false)} loginSuccess={(Logined) => loginSuccess(Logined)}/> </UserContext2.Provider> : 
				<div className="form-structor">		
					<div className="exit-btn" onClick={() => closeUI(false)}>X</div>			
					<div className="signup">						
						
						<h2 className="form-title" id="login" onClick={(e) => ToSignUp(e)}><span>or</span>Log in</h2>
						
						<div className="form-holder">
							<input type="email" className="input" placeholder="UserName/Email" value={LoginUserName} onChange={(e)=>{ setLoginUserName(e.target.value) }}/>
							<input type="password" className="input" placeholder="Password" value={LoginPassword} onChange={(e)=>{ setLoginPassword(e.target.value) }}/>
						</div>
						<button className="submit-btn"  onClick={() => LoginAccount()} >Log in</button>
						<button className="submit-btn"  onClick={() => resetPassword()} >Forget Password</button>
					</div>
					<div className="login slide-up">
						<div className="center">
						<h2 className="form-title" id="signup" onClick={(e) => ToLogin(e)}><span>or</span>Sign up</h2>
						<div className="form-holder">
							<input type="text" className="input" placeholder="Name" value={RegLoginName} onChange={(e)=>{ setRegLoginName(e.target.value) }}/>
							<input type="email" className="input" placeholder="Email" value={RegEmail} onChange={(e)=>{ setRegEmail(e.target.value) }}/>
							<input type="password" className="input" placeholder="Password" value={RegLoginPassword} onChange={(e)=>{ setRegLoginPassword(e.target.value) }}/>
							<input type="password" className="input" placeholder="Password" value={RegLoginPasswordAgain} onChange={(e)=>{ setRegLoginPasswordAgain(e.target.value) }}/>
						</div>
						<button className="submit-btn" onClick={() => CreateAccount()}>Sign up</button>
						</div>
					</div>			
				</div> }
			</Dialog>

			<MessageDialog showDialog={VerifyFailUI} title={DialogTitle} content={Message} closeUI={() => setVerifyFailUI(false)}/>
		</div>

		
	);
}

export default Login;
