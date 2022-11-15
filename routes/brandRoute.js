const express = require("express");
const { createBrand, getAllBrand, UpdateBrand, deleteBrand, Updatethumbnail, Updateicon,getBrandbyname } = require("../controllers/brandController");

const router = express.Router();
router.route("/brand/new").post(createBrand);
router.route("/brand/all").get(getAllBrand);
router.route("/brand/:id").put(UpdateBrand);
router.route("/brand/:id").delete(deleteBrand);
router.route("/brand/thumbnails/:id").put(Updatethumbnail);
router.route("/brand/icon/:id").put(Updateicon);
router.route("/brand/name/:name").put(getBrandbyname);


module.exports = router;