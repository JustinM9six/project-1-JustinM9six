import { Reimbursement } from "../models/reimbursement";
import { daoGetUserLogin, daoGetAllUsers, daoGetUserById, daoUpdateUser } from "../repositories/user-dao";
import { User } from "../models/user";
import { doaUpdateR } from "../repositories/reimbursement-dao";

export function getEmployeeLogin(username: string, password: string) {
    return daoGetUserLogin(username, password)
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

export async function updateR(id: number, r: Reimbursement) {
    try {
        return await doaUpdateR(id, r)
    } catch (e) {
        throw e;
    }
}