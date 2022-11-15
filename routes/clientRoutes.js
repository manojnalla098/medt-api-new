const express = require("express");
const { registerClient, loginClient, isClient, updateClientRole, deleteClient,registerClientWithPassword } = require("../controllers/clientController");
const router = express.Router();

router.route("/client/register").post(registerClient);
router.route("/client/registerwithpassword").post(registerClientWithPassword);
router.route("/client/login").put(loginClient);
router.route("/client/isClient/:mobile").post(isClient);
router.route("/admin/client/:id").put(updateClientRole);
router.route("/admin/client/:id").put(deleteClient);
 
module.exports = router;
