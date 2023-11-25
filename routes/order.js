const Order = require("../models/order");

const router = require("express").Router();

//CREATE

router.post("/neworder", async (req, res) => {
 
  
 
  try { 
  
    const neworder = await Order.create({userId:req.body.userid,amount:req.body.amount,products:req.body.products,Totalproducts:req.body.quantity});
 
    res.status(200).json(neworder);
  } catch (err) {
   
    res.status(500).json(err);
  }
});






//UPDATE
router.post("/update",async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
     { _id:req.body.orderid},
      {
        $set: {status:req.body.status},
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.post("/deleteorder", async (req, res) => {
  try {
    await Order.findOneAndDelete({_id:req.body.orderid});
    
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.post("/userorders", async (req, res) => {
  try {
    const orders = await Order.find({userId:req.body.userid});
   
   
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/",  async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;