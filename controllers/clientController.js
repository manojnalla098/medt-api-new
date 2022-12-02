const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Client = require("../models/clientModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
 const { sendClientToken } = require("../utils/jwtToken");


exports.registerClient =catchAsyncErrors(async (req, res, next)=>{
  try {
    const client = await Client.create(req.body);
    res.status(201).json({
      success:true, 
      client
  });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});


// Login Client
exports.loginClient = catchAsyncErrors(async (req, res, next) => {
  try {
    const {mobile} = req.body;
    // checking if client has given password and email both
  
    if (!mobile) {
      return next(new ErrorHander("Please enter your mobile number", 400));
    }
  
    const client = await Client.findOne({ mobile });
  
    if (!client) {
      return next(new ErrorHander("Client does not exist", 401));
    }
    sendClientToken(client, 200, res);
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});

// Checking Client
exports.isClient = catchAsyncErrors(async (req, res, next) => {
  try {
    const  mobile  = req.params.mobile;
    const  otp  = req.body.otp;
  
    // checking if client has given mobile
  
    if (!mobile) {
      return next(new ErrorHander("Please enter your mobile number", 400));
    }
  
    const client = await Client.findOne({ mobile });
  
    if (!client) {
      return next(new ErrorHander("Client does not exist", 401));
    }
  
    client.otp = otp;
    sendClientToken(client, 200, res);
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});


// update Client Role -- Admin
exports.updateClientRole = catchAsyncErrors(async (req, res, next) => {
  try {
    const newClientData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await Client.findByIdAndUpdate(req.params.id, newClientData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    }); 
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});

// Delete Client --Admin
exports.deleteClient = catchAsyncErrors(async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return next(
        new ErrorHander(`Client does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    const imageId = client.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);
  
    await client.remove();
    res.status(200).json({
      success: true,
      message: "Client Deleted Successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});


// Register with password client
exports.registerClientWithPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });

    const { name, email, password,mobile } = req.body;

    const client = await Client.create({
      name,
      email,
      password,
      mobile,
      avatar: {
        public_id: "this is public id",
        url: "profilepicUrl",
      },
    });
    res.status(201).json({
      success: true,
      client,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error:error
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error:error
    });
  }
});

