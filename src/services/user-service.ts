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

export async function updateUser(id: number): Promise<User> {
    try {
        let user = await daoGetUserById(id)
        let single = user[0]
        daoUpdateUser(single, id)
        return single
    } catch (e) {
        throw e;
    }
}

export function updateR(id: number, r: Reimbursement) {
    return doaUpdateR(id, r)
}