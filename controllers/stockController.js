const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Stock = require("../models/stockModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


// create Stock
exports.createStock = catchAsyncErrors(async (req, res, next)=>{
    try {
        const stock = await Stock.create(req.body); 
        res.status(201).json({
            success:true, 
            stock
        });
    } catch (error) {
        
    }
})

// GetAll stock
exports.getAllStock = catchAsyncErrors(async(req, res)=>{
    try {
        const stock = await Stock.find(); 
        res.status(200).json({
            success:true, 
            stock
        });  
    } catch (error) {
     
    }  
});
