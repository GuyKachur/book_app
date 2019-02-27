const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBookSubInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.bookURL = !isEmpty(data.bookURL) ? data.bookURL : "";

  // if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
  //   errors.name = "Name must be between 2 and 30 characters";
  // }

  if (Validator.isEmpty(data.title)) {
    errors.title = "title required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.author = "author required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "description required";
  }
  
  if (Validator.isEmpty(data.bookURL)) {
    errors.bookURL = "bookURL required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
