import React from 'react';
import './ProductDisplay.css';
import Barcode from 'react-barcode';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductDisplay() {

    
    const location = useLocation();
    const data = location.state;
    console.log("ProductDisplay.js data", data);
    const navigate = useNavigate();
    const handleEditDetails = () =>{
        navigate("/productForm",{
            state: data
        });
    }
    const handleSaveChanges = () =>{
        navigate("/listing",{
            state: data
        });
    }
    
    return (
        <div className="notification-container">
            <div className="notification-header">
            <span className="checkmark-icon">✔</span>
            <h2>Successfully Added Product</h2>
            </div>
            <div className="product-details">
                <img src={require(`../uploads/${data.productImage}`)} alt={data.productName} />
                <div className="text-details">
                    <h3>Product Name: {data.productName}</h3>
                    <p><strong>Product Description : </strong>{data.productDescription}</p>
                    <p><strong>Manufacturer:</strong> {data.manufacturerName}</p>
                    <p><strong>Product ID:</strong> {data.productId}</p>
                    <p><strong>Price (per piece):</strong> {data.productPrice}</p>
                    <p><strong>Quantity:</strong> {data.productQuantity}</p>
                    <p><strong>Category:</strong> {data.category}</p>
                </div>
            </div>
            <div className="product-barcode">
                <Barcode value={data._id} />
                <button>Print Barcode</button>
                <button>Save to device</button>
            </div>
            <div className="actions">
            {/* <button>Edit Details</button>
            <button>Save Changes</button> */}
            <button onClick={handleEditDetails}>Edit Details</button>
            <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
          
    )
}
