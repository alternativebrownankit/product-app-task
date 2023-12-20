import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const productData = {
        productName: '',
        productId: '',
        manufacturerName: '',
        productDescription: '',
        productQuantity: '',
        category: 'Category1',
        productPrice: '',
        productImage: ''
    };
    const handleClick = () => {
        navigate("/productForm",{
            state: productData
        });
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button style={{ padding: '10px', fontSize: '16px' }} onClick={handleClick}>
                Click to Add Product
            </button>
        </div>
    )
}
