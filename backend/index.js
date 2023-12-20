const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const Product = require('./model/productModel');
const fs = require('fs');
const path = require("path");
const axios = require('axios');



app.use(cors());
app.use(express.json());

const mongoURI = "mongodb://0.0.0.0:27017/made2automate";
const connectToMongo = async () => {
    mongoose.connect(mongoURI);
    console.log('Connected to Database successfully');
}
connectToMongo();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },

    filename: (req, file, cb) => {
        cb(null, "file_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single("productImage");


app.post('/submitForm', upload, async (req, res) => {
    try {

        console.log("REQUEST FILE", req.file.filename);
        console.log("REQUEST BODY: ", req.body);
        const newProduct = new Product({
            productName: req.body.productName,
            productId: req.body.productId,
            manufacturerName: req.body.manufacturerName,
            productDescription: req.body.productDescription,
            productQuantity: req.body.productQuantity,
            category: req.body.category,
            productPrice: req.body.productPrice,
            productImage: req.file.filename
        });
        console.log("REQUEST BODY ID", req.body._id);
        if (!req.body._id) {
            console.log("no product found, creating new: ", req);
            const savedProduct = await newProduct.save();
            console.log(savedProduct);
            res.status(201).send(savedProduct);
        }
        else {
            console.log("product found: ", req.body);
            let product = await Product.findById(req.body._id);
            console.log("Product found: ", product);
            const deleteImagePath = path.resolve(__dirname, `../src/uploads/${product.productImage}`);
            fs.unlink(deleteImagePath, (err) => {
                if (err) {
                    console.error("Error in deleting image", err);
                }
            })
            await Product.findByIdAndUpdate(req.body._id, {
                $set:
                {
                    productName: req.body.productName,
                    productId: req.body.productId,
                    manufacturerName: req.body.manufacturerName,
                    productDescription: req.body.productDescription,
                    productQuantity: req.body.productQuantity,
                    category: req.body.category,
                    productPrice: req.body.productPrice,
                    productImage: req.file.filename
                }
            });
            product = await Product.findById(req.body._id);
            console.log("updated product: ", product);
            res.status(201).send(product);
        }

    } catch (error) {
        console.log("Error here: ");
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/handleShopifyListing', async (req, res) => {
    try {
        const password = "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"; // bring from env
        const username = "e0389062dd2399e7582f186f82e934b2"; // bring from env;
        const shopify_endpoint = "https://971186-2.myshopify.com/admin/api/2023-10/products.json"; // bring from env
        console.log("request body listing: ", req.body);
        const productDetails = {
            "product": {
                "title": req.body.productName,
                "body_html": `<p>${req.body.productDescription}</p>`,
                "vendor": req.body.manufacturerName,
                "product_type": req.body.category,
                "variants": [
                    {
                        "price": req.body.productPrice,
                        "sku": req.body.productId,
                        "inventory_management": 'shopify',
                        "inventory_policy": 'deny',
                        "inventory_quantity": req.body.productQuantity
                    }
                ],
                "inventory_management": 'shopify',
            }
        };
        const shopifyResponse = await axios.post(
            shopify_endpoint,
            productDetails,
            {
                auth: {
                    username: username,
                    password: password,
                },
            }
        );
        console.log('product uploaded, now image uploading', shopifyResponse);
        const productId = shopifyResponse.data.product.id;
        const shopify_endpoint_for_image = `https://971186-2.myshopify.com/admin/api/2023-10/products/${productId}/images.json`; // bring from env
        const imageDetails = {
            image: {
                "attachment": fs.readFileSync(path.resolve(__dirname, `../src/uploads/${req.body.productImage}`), {
                    encoding: 'base64'
                })
            },
        };

        const imageResponse = await axios.post(
            shopify_endpoint_for_image,
            imageDetails,
            {
                auth: {
                    username: username,
                    password: password,
                },
            }
        );
        console.log("listing successful: ", imageResponse);
        res.send('Uploaded on shopify');
    } catch (error) {
        console.log("Error here shopify listing: ");
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
