import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema, { orderValidationSchema } from "./user.validation";


const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    
    try {
        const userData = req.body;
        const {error,value} = userValidationSchema.validate(userData,{ abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details,
            });
        }

        const result = await userServices.createUserIntoDB(value)


        res.status(200).json({
            success: true,
            message: 'User is created successfully!',
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
            message: 'User fetched successfully!',
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

        if (result) {
           
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        } else {
            
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

const updateUserById = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    const userData = req.body;
    console.log(userData);

    const {error,value} = userValidationSchema.validate(userData,{ abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details,
            });
        }

    try {
        
        const result = await userServices.UpdateUserFromDB(userId,value);

        if (result) {
         
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: result,
            });
        } else {
          
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

const deleteUserById = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    console.log(userId);
    
    try {
        
        const result = await userServices.deleteUserFromDB(userId);

        
        if (result) {
            
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        } else {
           
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

const updateOrderInUser = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);
    const orderData = req.body;
    console.log(orderData);

    const {error,value} = orderValidationSchema.validate(orderData,{ abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.details,
            });
        }

    try {
        
        const result = await userServices.updateOrderFromDB(userId,value);

        if (result) {
            
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        } else {
            
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

const allOrderInUser = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);

    try {
        
        const result = await userServices.allOrdersFromDB(userId);

        if (result) {
           
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        } else {
           
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

const ordersPriceInUser = async (req: Request, res: Response) => {
    
    const userId = Number(req.params.userId);

    try {
        
        const result = await userServices.totalOrdersPriceFromDB(userId);

        if (result) {
           
            res.status(200).json({
                success: true,
                message: 'Total price calculated successfully!',
                data: {totalPrice:result},
            });
        } else {
            
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const userControllers = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
    updateOrderInUser,
    allOrderInUser,
    ordersPriceInUser
}