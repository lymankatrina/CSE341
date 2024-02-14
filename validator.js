const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // email must be an email
    body('email').isEmail().withMessage('Must be a valid email'),
    // birthdate must be a date
    body('birthday')
      .matches(/^\d{2}\/\d{2}\/\d{4}$/)
      .withMessage('Must be a valid date MM/DD/YYYY')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = { validate, userValidationRules };
