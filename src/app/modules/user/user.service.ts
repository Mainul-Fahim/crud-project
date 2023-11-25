import { IUser } from "./user.interface";
import { User } from "./user.model";


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
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

const allUsersFromDB = async () => {

    try {
        const result = await User.find().select('username fullName age email address');
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

const singleUserFromDB = async (userId: number) => {

    try {
        const result = await User.find({ userId }).select('-password -_id');
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

const UpdateUserFromDB = async (userId: number, user: IUser) => {

    try {
        await User.updateOne({ userId }, user);
        const res = await singleUserFromDB(userId)
        return res;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

const deleteUserFromDB = async (userId: number) => {

    try {
        const result = await User.deleteOne({ userId });
        return result;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
}

export const userServices = {
    createUserIntoDB,
    allUsersFromDB,
    singleUserFromDB,
    UpdateUserFromDB,
    deleteUserFromDB
}