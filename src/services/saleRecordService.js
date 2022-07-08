import http from "../http-common";

const NewRecord = (data) => {
    return http.post(`/CreateNewRecord`, data);
};

const GetAllRecordByID = (UserID, saleID) => {
    return http.get(`/GetAllRecordByID/${UserID}/${saleID}`);
};

const GetRecordIfExist = (data) => {
    return http.post(`/GetRecordIfExist`, data);
};

const UpdateRecord = (data) => {
    return http.put(`/UpdateRecord`, data);
};

const DeleteRecord = RecordID => {
    return http.delete(`/DeleteRecord/${RecordID}`);
};
const saleRecordService = {   
    NewRecord,
    GetAllRecordByID,
    UpdateRecord,
    DeleteRecord,
    GetRecordIfExist
  };
  export default saleRecordService;