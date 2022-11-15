const express = require("express");
const { createEmployee, getAllEmployee, UpdateEmployee, deleteEmployee, loginEmployee,
      } = require("../controllers/employeeController");



const router = express.Router();

router.route("/employee/new").post(createEmployee);
router.route("/employee/all").get(getAllEmployee);
router.route("/employee/:id").put(UpdateEmployee);
router.route("/employee/:id").delete(deleteEmployee);
router.route("/employee/login").post(loginEmployee);
module.exports = router;
