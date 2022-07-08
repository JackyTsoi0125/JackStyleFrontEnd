import http from "../http-common";

const UploadImage = (file) => {
    return http.post(`/UploadImage`, file);
};



const FileService =  {
    UploadImage
};
export default FileService;