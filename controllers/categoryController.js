const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
// create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await await Category.create(req.body);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {}
});
exports.Updatedesktopicon = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category  not found",
      });
    }
    const desktopicon = await cloudinary.v2.uploader.upload(
      req.body.desktopicon[0],
      {
        folder: "Category/Desktop",
        width: 150,
        crop: "scale",
      }
    );

    req.body.desktopicon = {
      public_id: desktopicon.url.slice(60, 71),
      url: desktopicon.secure_url,
    };
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {}
});

exports.Updatethumbnail = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category  not found",
      });
    }
    const thumbnail = await cloudinary.v2.uploader.upload(
      req.body.thumbnail[0],
      {
        folder: "Category/Thumbnails",
        width: 150,
        crop: "scale",
      }
    );

    req.body.thumbnail = {
      public_id: thumbnail.url.slice(60, 71),
      url: thumbnail.secure_url,
    };

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {}
});

exports.Updateicon = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category  not found",
      });
    }
    const icon = await cloudinary.v2.uploader.upload(req.body.icon[0], {
      folder: "Category/Icons",
      width: 150,
      crop: "scale",
    });

    req.body.icon = {
      public_id: icon.url.slice(60, 71),
      url: icon.secure_url,
    };

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {}
});

exports.Updatebanners = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category  not found",
      });
    }
    const banners = await cloudinary.v2.uploader.upload(req.body.banners[0], {
      folder: "Category/Banner",
      width: 150,
      crop: "scale",
    });

    req.body.banners = {
      public_id: banners.url.slice(60, 71),
      url: banners.secure_url,
    };

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {}
});

//create thumbnail

//Get Category

exports.getAllcategory = catchAsyncErrors(async (req, res) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});

exports.getAllcategorybySupercategy = catchAsyncErrors(async (req, res) => {
  const category = await Category.find({ supercategoryid: req.params.id });

  res.status(200).json({
    success: true,
    category,
  });
});

exports.getcategorybyslugurl = catchAsyncErrors(async (req, res) => {
  const category = await Category.findOne({ slugUrl: req.params.slugurl });

  res.status(200).json({
    success: true,
    category,
  });
});

//update category

exports.UpdateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "category not found",
      });
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {}
});

//Delete category

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.remove();
    res.status(200).json({
      success: true,
      message: "Category Delete Successfully",
    });
  } catch (error) {}
});
