const express = require("express");
const { createAddress, getAllAddresses, getAllAddressesByClient } = require("../controllers/addressController");
const router = express.Router();


router.route("/address/new").post(createAddress);
router.route("/address/all").get(getAllAddresses);
router.route("/address/client/:clientid").get(getAllAddressesByClient);
module.exports = router;