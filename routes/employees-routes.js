// john
const express = require("express");
const { check } = require("express-validator");

const employeesController = require("../controllers/employees-controller");

const router = express.Router();

router.get("/:pid", employeesController.getEmployeeById);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("position").not().isEmpty(),
    check("department").not().isEmpty(),
    check("email").isEmail(),
    check("phone").isMobilePhone(),
  ],
  employeesController.createEmployee
);

router.patch(
  "/:pid",
  [
    check("name").not().isEmpty(),
    check("position").not().isEmpty(),
    check("department").not().isEmpty(),
    check("email").isEmail(),
    check("phone").isMobilePhone(),
  ],
  employeesController.updateEmployee
);

router.delete("/:pid", employeesController.deleteEmployee);

module.exports = router;
