const Cart = require("../models/cart");

const router = require("express").Router();

//CREATE

router.post("/newcart", async (req, res) => {
 
  
 
  try { 
    
    const newCart = await Cart.create({customerId:req.body.userid});
   
    res.status(200).json(newCart);
  } catch (err) {
   
    res.status(500).json(err);
  }
});

router.post("/newordercart", async (req, res) => {
 
  
 
  try { 
    try{await Cart.findOneAndDelete({customerId:req.body.userid});}catch(e){console.log(e);}
    const newCart = await Cart.create({customerId:req.body.userid});
   
    res.status(200).json(newCart);
  } catch (err) {
   
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/add", async (req, res) => {
  try {
    const updatedCart = await Cart.findOne({customerId:req.body.body.data.userid});
    const addedproduct=req.body.body.data;
    updatedCart.totalquantity+=addedproduct.quantity;
    updatedCart.totalprice+=((addedproduct.quantity)*(addedproduct.price));
    
    const randidd=Math.floor(100000 + Math.random() * 900000);
    addedproduct.randid=randidd;
    updatedCart.products.push(addedproduct);
    try{await updatedCart.save();
      
    
      res.status(200).json(updatedCart);
    }catch(err){console.log(err);}
   


    
  } catch (err) {
    res.status(500).json(err);
  }
});



//DELETE product
router.post("/delete",  async (req, res) => {
  try {
    const cart=await Cart.findOne({customerId:req.body.body.data.userid});
    
      const newproductarray=cart.products.filter((product) =>product.randid!== req.body.body.data.randid);
    const newtotalquantity=cart.totalquantity-req.body.body.data.quantity;
    const newtotalprice=(cart.totalprice)-((req.body.body.data.price)*(req.body.body.data.quantity));
    const updatedcart=await Cart.findOneAndUpdate({customerId:req.body.body.data.userid},
      { "$set": { products: newproductarray, totalquantity: 
        newtotalquantity, totalprice: newtotalprice}},{new: true});
        res.status(200).json(updatedcart);
        
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.post("/usercart", async (req, res) => {
  try {
    const cart = await Cart.findOne({customerId:req.body.userid});
   
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

