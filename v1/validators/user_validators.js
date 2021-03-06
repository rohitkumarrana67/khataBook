const Joi = require("joi");

const createValidator = async function (req_data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().min(7).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    });
    return await schema.validateAsync(req_data);
};

const loginValidator = async function (req_data) {
    const schema = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    });
    return await schema.validateAsync(req_data);
}

const updateValidator = async function (req_data) {
    // console.log(req_data)
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        address: Joi.string().required(),
        mobile_number: Joi.number().integer().required()
    });
    return await schema.validateAsync(req_data);
}

const updatePasswordValidator = async function (req_data) {

    const schema = Joi.object({
        current_password: Joi.string().min(7).required(),
        new_password: Joi.string().min(7).required()
    })
    return await schema.validateAsync(req_data)
}

const getAvatarValidator = async function (req_data) {
    const req_obj = { user_id: req_data.id }
    const schema = Joi.object({
        user_id: Joi.string().guid({ version: "uuidv4" }).required()
    })
    return await schema.validateAsync(req_obj);
}

const deleteRequestValidator = async function (params) {
    
    const params_schema = Joi.object({
        user_id: Joi.string().guid({version:"uuidv4"}).required()
    }).options({allowUnknown:false});
    return await params_schema.validateAsync(params);
}

const forgotpasswordValidator = async function (req_data) {
   
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required()
    })
    return await schema.validateAsync(req_data)
}

const resetpasswordValidator = async function (req_data) {
    const schema = Joi.object({
        newpassword: Joi.string().min(7).required(),
        resetLink: Joi.string().required()
    })
    return await schema.validateAsync(req_data)
}

module.exports = {
    createValidator,
    loginValidator,
    updateValidator,
    updatePasswordValidator,
    deleteRequestValidator,
    forgotpasswordValidator,
    resetpasswordValidator
}