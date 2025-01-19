import Joi from "joi";

export function validateCreateUser(data: any) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    return schema.validate(data);
}

export function validateLoginUser(data: any) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    return schema.validate(data);
}
