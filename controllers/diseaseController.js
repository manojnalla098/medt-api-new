const Disease = require("../models/diseaseModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create Disease
exports.createDisease = async (req, res, next)=>{
    try {
        const disease = await Disease.create(req.body); 
    } catch (error) {
        res.status(201).json({
            success:true, 
            disease
        }); 
    } 
}

//Get  Disease
exports.getAllDisease = async(req, res)=>{
    try {
        const disease = await Disease.find(); 
    } catch (error) {
        
    res.status(200).json({
        success:true, 
        disease
    });
     
    }
};

//update Disease

exports.UpdateDisease = async (req, res,next)=>{
    try {
        let  = await Disease.findById(req.params.id);
        if(!disease)
        {
           return res.status(500).json({
                success:false,
                message: "Disease not found"
            });
        }
        disease = await  Disease.findByIdAndUpdate(req.params.id, req.body,
        { 
            new:true, 
            useFindAndModify:false, 
            runValidators:true
        });  
    } catch (error) {
        res.status(200).json({
            success:true, 
            disease
        });  
    }
};


//Delete Disease

exports.deleteDisease = async(req,res,next)=>{
    try {
        const disease = await Disease.findById(req.params.id);

        if(!disease){
            return res.status(500).json({
                success:false,
                message:"Disease not found"
            })
        }
    
        await disease.remove();
        res.status(200).json({
            success:true,
            message:"Disease Delete Successfully"
        }) 
    } catch (error) {
        
    }
};