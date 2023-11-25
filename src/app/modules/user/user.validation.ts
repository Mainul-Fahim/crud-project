import Joi from 'joi';

// Define a Joi schema for the Order
export const orderValidationSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
});

// Define a Joi schema for the User
const userValidationSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    fullName: Joi.object({
        firstName: Joi.string()
            .required()
            .trim()
            .max(20)
            .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
            .message('First Name must start with a capital letter'),
        lastName: Joi.string().required(),
    }).required(),
    age: Joi.number().min(1).max(100).required(),
    email: Joi.string().email().required(),
    isActive: Joi.boolean().required(),
    hobbies: Joi.array().items(Joi.string()),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    orders: Joi.array().items(orderValidationSchema),
});

export default userValidationSchema;