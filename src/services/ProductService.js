import http from "../http-common";

const GetAllProduct = () => {
    return http.get(`/GetAllProduct`);
};

const GetAllProductFromList = (data) => {
    return http.post(`/GetAllProductFromList`, data);
};
const UpdateProduct = (ProductID, data) => {
    return http.put(`/UpdateProduct/${ProductID}`, data);
};

const CreateProduct = data => {
    return http.post("/CreateProduct", data);
};

const DeleteProduct = ProductID => {
    return http.delete(`/DeleteProduct/${ProductID}`);
};

const ProductService = {
    GetAllProduct,
    UpdateProduct,
    CreateProduct,
    DeleteProduct,
    GetAllProductFromList
};
export default ProductService;