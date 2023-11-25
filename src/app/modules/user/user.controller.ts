import { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    
    try {
        const userData = req.body;
        const result = await userServices.createUserIntoDB(userData)

        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getAllUser = async (req: Request, res: Response) => {
    
    try {
        
        const result = await userServices.allUsersFromDB()

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getUserById = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    console.log(userId);
    
    try {
        
        const result = await userServices.singleUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
    }
}

const updateUserById = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    const userData = req.body;
    console.log(userData);
    try {
        
        const result = await userServices.UpdateUserFromDB(userId,userData);

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    console.log(userId);
    
    try {
        
        const result = await userServices.deleteUserFromDB(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const userControllers = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}