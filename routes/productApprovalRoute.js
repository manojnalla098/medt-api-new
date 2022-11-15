const express = require("express");
const { createProductApproval, UpdateProductApproval, deleteProductApproval, 
    GetproductApprovalbyid, getProductsApprovalbySuperCategoryname,
     GetproductbySlugUrl, getAllProductApproval, Updatethumbnail, UpdateSliderImages, 
     GetproductapprovalbyNull, GetproductapprovalbyNotNull } = require("../controllers/productApprovalController");


const router = express.Router();

router.route("/productapproval/all").get(getAllProductApproval);
router.route("/productapproval/new").post(createProductApproval);
router.route("/productapproval/one/:id").get(GetproductApprovalbyid);

router.route("/productapproval/all/:name/null").get(GetproductapprovalbyNull);
router.route("/productapproval/all/:name/notnull").get(GetproductapprovalbyNotNull);

router.route("/productapproval/all/:name").get(getProductsApprovalbySuperCategoryname);
router.route("/productapproval/thumbnails/:id").put(Updatethumbnail);
router.route("/productapproval/newBanner/:id").put(UpdateSliderImages);
router.route("/productapproval/:supercatname/:slugurl").get(GetproductbySlugUrl);
router.route("/productapproval/:id").put(UpdateProductApproval);
router.route("/productapproval/:id").delete(deleteProductApproval);


module.exports = router;