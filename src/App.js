import React ,{createContext, useState, useMemo, useEffect } from "react";
import "./style/bootstrap.min.css";
import './App.css';
import './style/style.css';
import './style/login.scss';
import './style/responsive.css';
import Login from "./components/Login.component";
import useWindowDimensions from "./hook/useWindowDimensions";
import ResetPassword from "./components/ResetPassword.component";
import ProductList from "./components/Page/ProductList.component";
import FavouriteList from "./components/Page/FavouriteList.component";
import AboutUS from "./components/Page/AboutUS.component";
import History from "./components/Page/History.component";
import HistoryDetail from "./components/Page/HistoryDetail.component";
import Home from "./components/Page/Home.component";
import ShoppingList from "./components/Page/ShoppingList.component";
import Payment from "./components/Page/Payment.component";
import ProductManagement from "./components/Page/ProductManagement.component";
import UserManagement from "./components/Page/UserManagement.component";
import User from "./components/Page/User.component";
import { BrowserRouter , Route, Routes, Link } from "react-router-dom";
import {  mdiCart } from '@mdi/js';
import Icon from '@mdi/react'
import {Menu, MenuItem} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import JackStyleLogo from "./images/JackStyleLogo.png"
export const UserContext = createContext();


function App() {  

   var Logined = {
      UserID: 0,
      UserName: "",
      Role: "",
      Email: "",
      Verificationcode :"",
      verification : 0
   };
  
   const { height, width } = useWindowDimensions();
   const [menu, setmenu] = useState(true)
   const [menu2, setmenu2] = useState(false)
   const [preview, setPreview] = useState("http://localhost:7000/images/JackStyleLogo.png")
   const [LoginUI, setLoginUI] = useState(false)
   const [ResetPasswordUI, setResetPasswordUI] = useState(false) 
   const [ShoppingCartUI, setShoppingCartUI] = useState(false) 
   const [Logining, setLogining] = useState(false)  
   const [Account, setAccount] = useState(Logined);
  

   useEffect(() => {

      if(width > 767)
      {
         setmenu(true) 
         setmenu2(false)
      }
      else if(menu2)
      {
         setmenu(true)
      }
      else
      {setmenu(false)}

   }, [width, menu2]);

   const ac = useMemo(() => {
      return {
         Account,
         setAccount,
         Logining,
         setLogining,
         log: (t) => console.log(t)
      }
   }, [Account, Logining]);
  
   const LoginSuccess = (username) =>{

      setAccount(username)
      setLoginUI(false)      
      setLogining(true)

   }

   const resetPassword = () =>{
         setLoginUI(false)
         setResetPasswordUI(true)
   }
 
   const LoginClick = () =>{

      var defaultLogin = {
         UserID: 0,
         UserName: "",
         Role: "",
         Email: "",
         Verificationcode :"",
         verification : 0
      };


      
      if(!Logining)
      {
         setLoginUI(true)
      }
      else
      {
         setAccount(defaultLogin)           
         setLogining(false)
      }
      

   }
   return (
      <div className="App position_head">       
         <UserContext.Provider value={ac}> 
         <BrowserRouter >
         <header>        
            <div className="header">

               <div className="container-fluid">
                  <div className="row">                  
                     <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                        <div className="full">
                           <div className="center-desk">
                              <div >
                                 <Link to="/Home" className="nav-link"><img className="logo" src={JackStyleLogo} alt="Pr2oductImage" /></Link>                               
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                        <nav className="navigation navbar navbar-expand-md navbar-dark ">
                           <button className="navbar-toggler" type="button" onClick={() => setmenu2(!menu2)}>
                              <span className="navbar-toggler-icon"></span>
                           </button>
                           {menu ? <div className="navbar-collapse" id="navbarsExample04">
                              <ul className="navbar-nav mr-auto">
                                 <li>
                                    <Link to="/Home" className="nav-link"> Home </Link>
                                 </li>
                                 <li >
                                    <Link to="/AboutUS" className="nav-link"> About US </Link>
                                 </li>
                                 <li>
                                    <Link to="/Product" className="nav-link"> Product </Link>
                                 </li>                                                       
                                 {Account.UserID !== 0 ? 
                                    <li>                                   
                                       <Menu menuButton={<div className="login_btn"><a className="nav-link" >{Account.UserName}</a></div>}>
                                             <MenuItem className="nav-item" ><Link to="/User" > Personal Setting</Link></MenuItem>
                                             <MenuItem className="nav-item" ><Link to="/FavouriteList" > Favourite List</Link></MenuItem>
                                             <MenuItem className="nav-item" ><Link to="/History" > History</Link></MenuItem> 
                                             <MenuItem className="nav-item"><Link to="/Cart" className="nav-link"><Icon path={mdiCart} size={1}/> Cart</Link></MenuItem>
                                             {Account.Role === "admin"? <MenuItem className="nav-item" ><Link to="/Admin/UserManagement" > System Admin</Link></MenuItem> : null}                          
                                             <MenuItem className="nav-item"  onClick={() => LoginClick()}><Link to="/Home">LogOut</Link></MenuItem>
                                       </Menu>                                    
                                    </li> 
                                 : <li className="login_btn">
                                       <a className="nav-link"  onClick={() => LoginClick()}>Login</a>
                                    </li> }
                                 
                                 
                              </ul>
                           </div>: null}
                           
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </header>
      
         <Routes >
            <Route  path='/'  element={<Home />}/>
            <Route  path='/Home'  element={<Home />}/>
            <Route  path='/AboutUS'  element={<AboutUS />}/>
            <Route  path='/Product'  element={<ProductList />} />
            <Route  path='/Cart'  element={<ShoppingList />}/>
            <Route  path='/User'  element={<User />}/>
            <Route  path='/History'  element={<History />}/>
            <Route  path='/History/:SaleID'  element={<HistoryDetail />}/>
            <Route  path='/Payment'  element={<Payment />}/>
            <Route  path='/FavouriteList'  element={<FavouriteList />}/>
            <Route  path='/Admin/UserManagement'  element={<UserManagement />}/>
            <Route  path='/Admin/ProductManagement' element={<ProductManagement />}/>
         </Routes >
            
      
      
         { LoginUI?  <Login login={username => LoginSuccess(username)} closeUI={(rec) => setLoginUI(rec)}  resetPassword={(rec) => resetPassword(rec)} /> : null }  
         { ResetPasswordUI?  <ResetPassword  closeUI={() => setResetPasswordUI(false)} /> : null }  
         { ShoppingCartUI?  <ShoppingList  closeUI={() => setShoppingCartUI(false)} /> : null }  
         
         </BrowserRouter >  
         </UserContext.Provider>

      
      </div>
   );
}


export default App;
