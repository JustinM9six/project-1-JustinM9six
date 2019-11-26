import { daoGetUserLogin, daoGetAllUsers, daoGetUserById, daoUpdateUser } from "../repositories/user-dao";
import { User } from "../models/user";

export async function getEmployeeLogin(username: string, password: string): Promise<User> {
    return await daoGetUserLogin(username, password)
}

export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        throw e;
    }
}

export async function getUserById(id: number): Promise<User[]> {
    return daoGetUserById(id)
}

export async function updateUser(id: number, u: User): Promise<User> {
    try {
        return daoUpdateUser(id, u)
    } catch (e) {
        throw e;
    }
}