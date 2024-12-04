const express = require("express");
const { check } = require("express-validator");

const employeesController = require("../controllers/employees-controllers");

const router = express.Router();

router.get("/", employeesController.getAllEmployees);

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
    check("name").optional().not().isEmpty(),
    check("position").optional().not().isEmpty(),
    check("department").optional().not().isEmpty(),
    check("email").optional().isEmail(),
    check("phone").optional().isMobilePhone(),
  ],
  employeesController.updateEmployee
);

router.put(
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