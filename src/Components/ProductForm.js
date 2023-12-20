import React, { useState } from 'react';
import './ProductForm.css';
import { saveProductData } from '../services/user-service';

import { useNavigate, useLocation } from 'react-router-dom'

const ProductForm = () => {

  let navigate = useNavigate();
  const location = useLocation();
  let productData = location.state;

  const [formData, setFormData] = useState(productData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("ProductForm.js before: ", productData);
    productData.productName = formData.productName;
    productData.productId = formData.productId;
    productData.manufacturerName = formData.manufacturerName;
    productData.productDescription = formData.productDescription;
    productData.productQuantity = formData.productQuantity;
    productData.category = formData.category;
    productData.productPrice = formData.productPrice;
    productData.productImage = image;

    saveProductData(productData).then((response) => {
        console.log("ProductForm.js: ", response);
        console.log("success");
        navigate("/updated",{
            state: response
        });
    });
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Product Name:
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Product ID:
        <input
          type="text"
          name="productId"
          value={formData.productId}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Manufacturer Name:
        <input
          type="text"
          name="manufacturerName"
          value={formData.manufacturerName}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Product Description:
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Product Quantity:
        <input
          type="text"
          name="productQuantity"
          value={formData.productQuantity}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Product Price Per Piece:
        <input
          type="text"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
          <option value="Category3">Category 3</option>
        </select>
      </label>

      <label>
        Product Image:
        <input
          type="file"
          name="productImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>

      <button type="button">Cancel</button>
      <button type="submit" >Save Changes</button>
    </form>
  );
};

export default ProductForm;
