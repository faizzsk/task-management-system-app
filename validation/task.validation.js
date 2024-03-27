const { body } = require("express-validator");

exports.validateTaskCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("dueDate")
    .notEmpty()
    .isDate()
    .withMessage("Due date is required and should be a valid date"),
  body("priority")
    .notEmpty()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority is required and should be Low, Medium, or High"),
    
  body("status")
    .notEmpty()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage(
      "Status is required and should be pending, In Progress or Completed"
    ),
];
