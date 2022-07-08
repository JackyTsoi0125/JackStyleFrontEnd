import http from "../http-common";


const Login = (UserID, password) => {
  return http.get(`/Login/${UserID}/${password}`);
};

const GetUserData = (UserID) => {
  return http.get(`/GetUserData/${UserID}`);
};

const VerifyCode = (data) => {
  return http.post("/VerifyCode", data);
};

const VerifyCodeForResetPassword = (data) => {
  return http.post("/VerifyCodeForResetPassword", data);
};

const CreateAccount = data => {
    return http.post("/CreateAccount", data);
};

const UpdateAccount = (UserID, data) => {
  return http.put(`/UpdateAccount/${UserID}`, data);
};

const UpdateAccount2 = ( data) => {
  return http.put("/UpdateAccount2", data);
};

const UpdatePassword = (UserID, data) => {
  return http.put(`/UpdatePassword/${UserID}`, data);
};

const CheckPassword = (data) => {
  return http.put("/CheckPassword", data);
};

const FindAccount = data => {
  return http.post("/FindAccount", data);
};

const generateVerificationcodeForResetPassword = (data) => {
  return http.post(`/genetateVerificationcodeForResetPassword`, data);
};
const ResetSuccessUpdate = (data) => {
  return http.post(`/ResetSuccessUpdate`, data);
};
function GetAllUser() {
  return http.get(`/GetAllAccount`);
}

const RegenerateCode = (data) => {
  console.log(data)
  return http.put(`/RegenerateCode`, data);
};

const SendEmail = (data) => {
  return http.post(`/sendVerificationcode`, data);
};

const SendEmailForResetPassword = (data) => {
  return http.post(`/SendEmailForResetPassword`, data);
};

const LoginService = {
  RegenerateCode,
  Login,
  CreateAccount,
  UpdateAccount,
  UpdateAccount2,
  UpdatePassword,
  SendEmail,
  GetUserData,
  VerifyCode,
  GetAllUser,
  FindAccount,
  ResetSuccessUpdate,
  generateVerificationcodeForResetPassword,
  SendEmailForResetPassword,
  VerifyCodeForResetPassword,
  CheckPassword
  
};
export default LoginService;