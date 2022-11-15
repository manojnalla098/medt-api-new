const Employee = require("../models/employeeModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const crypto = require("crypto");




// create Employee

exports.createEmployee =catchAsyncErrors(async (req, res, next)=>{
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json({
        success:true, 
        employee
    });
    } catch (error) {
   
    }
  });

//Get Employee

exports.getAllEmployee =catchAsyncErrors(async(req, res)=>{
    try {
        const employee = await Employee.find(); 
        res.status(200).json({
            success:true, 
            employee
        }); 
    } catch (error) {
      
     
    }  
});


exports.loginEmployee = catchAsyncErrors(async (req, res, next) => {
    
    try {
        const { email, password, role } = req.body;
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  const name = employee.name;
    const isPasswordMatched = await employee.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
    const Roles = employee.roles;
    
    if(!Roles[role])
    {
        return next(new ErrorHander("Not Valid Role", 401));
       
    }
    const zoneid = employee.zoneid;
    res.status(201).json({
        success:true,
        name: name,
        email: email,
        zoneid: zoneid  
      });
    } catch (error) {
       
    } 
  });


//update Employee

exports.UpdateEmployee =catchAsyncErrors( async (req, res,next)=>{
    try {
        let employee = await Employee.findById(req.params.id);
        if(!employee)
        {
           return res.status(500).json({
                success:false,
                message: "Employee not found"
            });
        }
        employee = await  Employee.findByIdAndUpdate(req.params.id, req.body,
        { 
            new:true, 
            useFindAndModify:false, 
            runValidators:true
        }); 
        res.status(200).json({
            success:true, 
            employee
        });
    } catch (error) {
      
    }
});


//Delete Employee

exports.deleteEmployee =catchAsyncErrors(async(req,res,next)=>{
    try {
        const employee = await Employee.findById(req.params.id);

    if(!employee){
        return res.status(500).json({
            success:false,
            message:"Employee not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Employee Delete Successfully"
    }) 
    await employee.remove(); 
    } catch (error) {
       
    
    }
});