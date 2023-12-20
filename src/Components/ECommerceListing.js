import React from 'react';
import './ECommerceListing.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { eCommerceListingShopify } from '../services/user-service';

export default function ECommerceListing() {

    const platforms = [
        { name: 'Shopify' },
        // { name: 'Flipkart' },
        // { name: 'Indiamart' },
        // { name: 'Website' },
    ];
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state;
    console.log("listing data: ", productData);
    const handleBack = () =>{
        navigate("/updated",{
            state: productData
        });
    }
    const handleHome = () =>{
        navigate("/");
    }

    const handleListing = () =>{
        eCommerceListingShopify(productData).then((response) => {
            console.log("ecommercelisting.js: ", response);
            console.log("success listing");
            navigate("/productListed");
            // window.location.hr = "https://admin.shopify.com/store/971186-2/products";
        });
    }



    return (
        <div className="ecommerce-listing">
            <h1>E-Commerce Listing</h1>
            <div className="product-details">
                
                <img src={require(`../uploads/${productData.productImage}`)} alt={productData.productName} />
                
                <div className="text-data">
                    <h2>Product Name : {productData.productName}</h2>
                    <p>Product Description : {productData.productDescription}</p>
                    <p>Manufacturer: {productData.manufacturerName}</p>
                    <p>Product ID: {productData.productId}</p>
                    <p>Price (per piece): {productData.productPrice}</p>
                    <p>Quantity: {productData.productQuantity} pieces</p>
                    <p>Category: {productData.category}</p>
                </div>
            </div>
            <div className="upload-buttons">
                {platforms.map((platform) => (
                    <div className="uploads">
                        <span>{platform.name}</span>
                        <button key={platform.name} onClick={handleListing}> Upload</button>
                    </div>
                ))}
            </div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleHome}>Continue to Home Page</button>
        </div>
    );
};
