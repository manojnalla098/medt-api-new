const Zone = require("../models/zoneModel");
const Productprice = require("../models/productPriceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


// create zone
exports.createZone = catchAsyncErrors(async (req, res, next)=>{
    try {
        const zone = await Zone.create(req.body);
    const newZoneId = zone._id;
    
    const firstZone = await Zone.findOne();
    const firstZoneId =firstZone._id;
   
    const productPriceArr = await Productprice.find({zoneId:firstZoneId});
    
    const myProductPriceArr = [...productPriceArr].zoneId= newZoneId;
   
    // myProductPriceArr.map(async(Singlerow)=>{
    //    await Productprice.create(Singlerow);
    // }); 
    res.status(201).json({
        success:true, 
        zone
    }); 
    } catch (error) {
       
    }
});


// Get Zone

exports.getAllzone = catchAsyncErrors(async(req, res)=>{
    try {
        const zone = await Zone.find(); 
        res.status(200).json({
            success:true, 
            zone
        });
    } catch (error) {
      
        
    }
});

//update Zone

exports.UpdateZone = catchAsyncErrors(async (req, res,next)=>{
    try {
        let zone = await Zone.findById(req.params.id);
    if(!zone)
    {
       return res.status(500).json({
            success:false,
            message: "Zone not found"
        });
    }
    zone = await  Zone.findByIdAndUpdate(req.params.id, req.body,
    { 
        new:true, 
        useFindAndModify:false, 
        runValidators:true
    }); 
    res.status(200).json({
        success:true, 
        zone
    }); 
    } catch (error) {
     
    }
});


//Delete Zone

exports.deleteZone =catchAsyncErrors(async(req,res,next)=>{
      try {
        const zone = await Zone.findById(req.params.id);

    if(!zone){
        return res.status(500).json({
            success:false,
            message:"Zone not found"
        })
    }

    await zone.remove();
    res.status(200).json({
        success:true,
        message:"Zone Delete Successfully"
    })
      } catch (error) {
       
      }
});
