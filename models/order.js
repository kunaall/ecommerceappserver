const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {userId: {
    type: String
  },
  products:{
    type: [Object],
    default:[{ quantity:3,id:78678}]
  },
  Totalproducts: {
    type: Number,
    required: true
  },
    amount: { type: Number, required: true },
    
    status: { type: String, default: "ordered" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);