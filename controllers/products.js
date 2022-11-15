const Product = require("../models/productModel");
const Productprice = require("../models/productPriceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Zone = require("../models/zoneModel");

const cloudinary = require("cloudinary");
// create product

exports.createProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    // const productprice = await Productprice.create(req.body);

    req.body.productId = product._id;
    
    let ZoneArray = await Zone.find();
    let ZoneId = ZoneArray[0]._id;
    req.body.zoneId = ZoneId;
    const productprice = await Productprice.create(req.body);
    req.body.status = false;
    req.body.hot = false;
    req.body.stocks = 0;

    for (let i = 1; i < ZoneArray.length; i++) {
      ZoneId = ZoneArray[i]._id;
      req.body.zoneId = ZoneId;
      const productprice = await Productprice.create(req.body);
    }

    res.status(201).json({
      success: true,
      product,
      message: "Product created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Product not created",
    });
  }
});

//Get All Product
// exports.getAllProducts = catchAsyncErrors(async (req, res) => {
//   try {
//     const product = await Product.find();

//     res.status(200).json({
//       success: true,
//       product,
//     });
//   } catch (error) {}
// });
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

//Get  Product with price
exports.productwithprice = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.find();

    const productprice = await Productprice.find().populate("productId");
    res.status(200).json({
      success: true,
      productprice,
    });
  } catch (error) {}
});

exports.getProductpricebyzoneid = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.find();

    const productprice = await Productprice.findOne({zoneId: req.params.zoneid, productId: req.params.productid});
    res.status(200).json({
      success: true,
      productprice,
    });
  } catch (error) {}
});

exports.Getproductbyid = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});


exports.getAllproductbycategory = catchAsyncErrors(async (req, res) => {
  const product = await Product.find({ categoryid: req.params.catId });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllproductbycategorySlugurl = catchAsyncErrors(async (req, res) => {
  const product = await Product.find({ categoryid: req.params.slugurl });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.GetproductbySlugUrl = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findOne({
      slugUrl: req.params.slugurl,
      supercategory: req.params.supercatname,
    });
    const productprice = await Productprice.find().populate("productId");
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
      productprice,
    });
  } catch (error) {}
});

exports.getProductsbyname = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.find({
      name: { $regex: `/${req.params.name}/` },
    });
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

exports.getProductsbySuperCategoryname = catchAsyncErrors(
  async (req, res, next) => {
    try {
      let product = await Product.find({ supercategory: req.params.name });

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "product not found",
        });
      }
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {}
  }
);

exports.Updateicon = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product  not found",
      });
    }
    const icon = await cloudinary.v2.uploader.upload(req.body.icon[0], {
      folder: "Product/Icons",
      width: 150,
      crop: "scale",
    });

    req.body.icon = {
      public_id: icon.url.slice(60, 71),
      url: icon.secure_url,
    };

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});


exports.Updatedesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product  not found",
      });
    }
    const desktopicon = await cloudinary.v2.uploader.upload(
      req.body.desktopicon[0],
      {
        folder: "Product/Desktop",
        width: 150,
        crop: "scale",
      }
    );

    req.body.desktopicon = {
      public_id: desktopicon.url.slice(60, 71),
      url: desktopicon.secure_url,
    };
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

//update Product

exports.Updateproduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

exports.Updatethumbnail = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product  not found",
      });
    }
    const thumbnail = await cloudinary.v2.uploader.upload(
      req.body.thumbnail[0],
      {
        folder: "Product/Thumbnails",
        width: 150,
        crop: "scale",
      }
    );

    req.body.thumbnail = {
      public_id: thumbnail.url.slice(60, 71),
      url: thumbnail.secure_url,
    };
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

exports.Uploadthumbnail = catchAsyncErrors(async (req, res, next) => {
  try {
    
    const thumbnail = await cloudinary.v2.uploader.upload(
      req.body.thumbnail,
      {
        folder: "Product/Thumbnails",
        width: 150,
        crop: "scale",
      }
    );

    const thumbnails = {
      public_id: thumbnail.url.slice(60, 71),
      url: thumbnail.secure_url,
    };
    
    res.status(200).json({
      success: true,
      thumbnails,
    });
  } catch (error) {}
});

exports.UpdateSliderImages = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    let sliderImages = [];
    sliderImages = product.sliderImages;
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product  not found",
      });
    }

    const NewImage = await cloudinary.v2.uploader.upload(req.body.newimage, {
      folder: "Product/SliderImages",
    });

    const NewImagedata = {
      public_id: NewImage.url.slice(60, 71),
      url: NewImage.secure_url,
    };

    req.body.sliderImages = [...sliderImages, NewImagedata];

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
});

//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  } catch (error) {}
});
