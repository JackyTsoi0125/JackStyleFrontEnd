import http from "../http-common";

const HistoryUpdate = (data) => {
    return http.post(`/HistoryUpdate`, data);
};

const Sold = (data) => {
    return http.post(`/Sold`, data);
};

const GetOneHistoryByUser = (UserID) => {
    return http.get(`/GetOneHistoryByUser/${UserID}`);
};

const GetAllHistoryByUser = (UserID) => {
    return http.get(`/GetAllHistoryByUser/${UserID}`);
};

const GetOneHistoryByUserIDandHistoryID = (UserID, SaleID) => {
    return http.get(`/GetOneHistoryByUserIDandHistoryID/${UserID}/${SaleID}`);
};
const RemoveCartProductUpdate = (data) => {
    return http.put(`/RemoveCartProductUpdate`, data);
};

const AddartProductUpdate = (data) => {
    return http.put(`/AddartProductUpdate`, data);
};

const SendEmaiForPaymentRecord = (data) => {
    return http.post(`/SendEmaiForPaymentRecord`, data);
};
const saleHistoryService = {   
    HistoryUpdate,
    GetOneHistoryByUser,
    GetAllHistoryByUser,
    GetOneHistoryByUserIDandHistoryID,
    RemoveCartProductUpdate,
    AddartProductUpdate,
    Sold,
    SendEmaiForPaymentRecord
    
  };
  export default saleHistoryService;