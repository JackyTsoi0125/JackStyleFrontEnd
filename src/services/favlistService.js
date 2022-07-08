import http from "../http-common";

const GetAllFavList = (UserID) => {
    return http.get(`/GetAllFavList/${UserID}`);
};

const GetFav = (ProductID,UserID) => {
    return http.get(`/GetFav/${UserID}/${ProductID}`);
};

const AddToFavList = (ProductID,UserID) => {
    return http.put(`/AddToFavList/${UserID}/${ProductID}`);
};
const RemoveFavList = (ProductID,UserID) => {
    return http.delete(`/RemoveFavList/${UserID}/${ProductID}`);
};

const favlistService = {
    GetAllFavList,
    AddToFavList,
    RemoveFavList,
    GetFav  
};

export default favlistService;