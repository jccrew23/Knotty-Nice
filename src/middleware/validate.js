import Validator from 'validatorjs';

export const saveProduct = (req, res, next) => {
    const validationRules = {
        "productName": "required|string",
        "productPrice": "required|numeric",
        "productCategory": "required|string"
    };

    // Instantiate Validator with the request body and the validation rules
    const validation = new Validator(req.body, validationRules);

    // Check if validation fails
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all()
        });
    } else {
        next(); // If validation passes, proceed to the next middleware
    }
};


export const saveTransaction = (req, res, next) => {
    
    const validationRule = {
        "paymentType": "required|string",
        "transactionAmount": "required|numeric",
        "transactionDate": "required|string",
        "products": "required|array"
    };
    const validation = new Validator(req.body, validationRule);
    if (validation.fails()) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: validation.errors.all()
        });
    } else {
        next(); // If validation passes, proceed to the next middleware
    }
};
