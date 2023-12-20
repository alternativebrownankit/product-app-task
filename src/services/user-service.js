import { myAxios } from "./helper";

export const saveProductData = (user)=>{
    return myAxios.post("/submitForm",user,{
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response)=>response.data)
    .catch(error => {
        console.error('Error:', error);
        // Handle the error here
    });
};

export const eCommerceListingShopify = (user)=>{
    return myAxios.post("/handleShopifyListing",user,{
        
    }).then((response)=>response.data)
    .catch(error => {

        console.error('Error user-service.js:', error);
        
    });
};
