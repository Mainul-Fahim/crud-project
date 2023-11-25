import { IUser } from "./user.interface";
import { User } from "./user.model";

// users api
const createUserIntoDB = async (user: IUser) => {

    try {
        if (await User.isUserExists(user.userId)) {
            throw new Error('User already exists!');
        }
        const result = await User.create(user);
        const { password, ...userWithoutPassword } = result.toObject()
        console.log('User saved successfully:', userWithoutPassword);
        return userWithoutPassword;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}

const allUsersFromDB = async () => {

    try {
        const result = await User.find().select('username fullName age email address');
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

const singleUserFromDB = async (userId: number) => {

    try {
        const result = await User.isUserExists(userId);
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

const UpdateUserFromDB = async (userId: number, user: IUser) => {

    try {
        const res = await User.isUserExists(userId);
        if (res) {
            await User.updateOne({ userId }, user);
        }
        const result = await singleUserFromDB(userId)
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

const deleteUserFromDB = async (userId: number) => {

    try {
        const res = await User.isUserExists(userId);
        if (res) {
            await User.deleteOne({ userId });
        }
        return res;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

// Orders Api

const updateOrderFromDB = async (userId: number, user: IUser) => {

    try {
        const res = await User.isUserExists(userId);
        if (res) {
            await User.updateOne({ userId }, {
                $push: {
                    orders: user,
                },
            });
        }
        return res;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

const allOrdersFromDB = async (userId: number) => {

    try {
        const res = await User.isUserExists(userId);
        if (res) {
          const result = await User.find().select('orders');
            return result;
        }
        return res;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

const totalOrdersPriceFromDB = async (userId: number) => {

    try {
        const res = await User.isUserExists(userId);
        if (res) {
          const result = await User.aggregate([
            {
                $match: {userId}
            },
            {
                $unwind: '$orders'
            },
            {
                $group: {
                    _id: null,
                    totalOrderPrice: { $sum: '$orders.price' },
                },
            }
          ]);
          if (result.length > 0) {
            return result[0].totalOrderPrice || 0;
        } else {
            return 0;
        }
        }
        return res;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
}

export const userServices = {
    createUserIntoDB,
    allUsersFromDB,
    singleUserFromDB,
    UpdateUserFromDB,
    deleteUserFromDB,
    updateOrderFromDB,
    allOrdersFromDB,
    totalOrdersPriceFromDB
}