const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const bodyParser = require('body-parser');


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.get('/', function(req, res){
  console.log("Root Route")
  res.json({ message: "hello world" });
});



app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
