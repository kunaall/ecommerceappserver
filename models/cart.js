const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

products:{
  type: [Object],
  default:[{ hi:"hii",randid:78}]
},
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  totalprice: {
    type: Number,
    default: 0,
  },
  totalquantity: {
    type: Number,
    default: 0,
  }
  
},{ timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);