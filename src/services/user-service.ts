import { daoGetUserLogin, daoGetAllUsers, daoGetUserById, daoUpdateUser } from '../repositories/user-dao';
import { User } from '../models/user';

//Login
export async function getEmployeeLogin(username: string, password: string): Promise<User> {
    return await daoGetUserLogin(username, password);
}

//Get all users
export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e;
    }
}

//Get user by id
export async function getUserById(id: number): Promise<User> {
    return daoGetUserById(id);
}

//Update a user
export async function updateUser(id: number, u: User): Promise<User> {
    try {
        return daoUpdateUser(id, u);
    } catch (e) {
        throw e;
    }
}