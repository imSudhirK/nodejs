import Joi from "joi";

export function validateCreateNotes(data: any) {
    const schema = Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        tag: Joi.string(),
    }).or("title", "description");

    return schema.validate(data);
}

export function validateUpdateNotes(data: any) {
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        tag: Joi.string(),
    }).or("title", "description", "tag");

    return schema.validate(data);
}
