import { Schema, model } from 'mongoose';
import { IUser, Order, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const orderSchema = new Schema<Order>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const userSchema = new Schema<IUser,UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String }],
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    orders: [orderSchema],
})

userSchema.pre('save', async function (next) {
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();

})

userSchema.statics.isUserExists = async function (userId: number) {
     return await this.findOne({ userId }).select('-password') || null;
};

// userSchema.post('find', async function (doc,next) {
//     doc = doc.select('-password')
//     next();

// })

export const User = model<IUser,UserModel>('User', userSchema);