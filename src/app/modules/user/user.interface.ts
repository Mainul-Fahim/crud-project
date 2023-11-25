import { Model } from 'mongoose';

export interface Order {
    productName: string;
    price: number;
    quantity: number;
  }

export interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: {
        firstName: string,
        lastName: string,
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
        street: string,
        city: string,
        country: string,
    };
    orders: Order[];
}

export interface UserModel extends Model<IUser> {
    isUserExists(id: number): Promise<IUser | null>;
  }