const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

const api = process.env.API_URL;

// this code calls upon a Middleware libraries
app.use(express.json());
app.use(morgan("tiny"));

// we create a table/schema
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number
});

const Product = mongoose.model('Product', productSchema);

// we initialize the route
// http://localhost:3000/api/v1/products
app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
      res.status(500).json({success: false})
  }
  res.send(productList);
  // const product = {
  //   id: 1,
  //   name: "hair dresser",
  //   image: "some_url",
  // };
  res.send(product);
});

// we refactor post 
app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: {
      type: Number,
      required: true
    }
  });

  product.save().then((createdProduct => {
    // return 201 response with created product
    res.status(201).json(createdProduct)
  })).catch((err) => {
    res.status(500).json({
      error: err,
      success: false
    });
    
   });
  res.send(newProduct);
});


mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection was Successful');
  })
.catch((err) => {
    console.log(err);
  });


// we run the server
app.listen(3000, () => {
  //console.log(api);
  console.log("server is running http://localhost:3000");
});
