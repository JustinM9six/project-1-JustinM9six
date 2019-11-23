import { Reimbursement } from "../models/reimbursement";
import {daoGetUserLogin, daoGetAllUsers, daoGetUserById, daoUpdateUser } from "../repositories/user-dao";
import { User } from "../models/user";
import { daoFindRById, doaUpdateR } from "../repositories/reimbursement-dao";

export function getEmployeeLogin(username:string, password:string){
    return daoGetUserLogin(username, password)
}

export function getAllUsers():Promise<User[]>{
    return daoGetAllUsers()
}

export function getUserById(id:number):User[]{
    return daoGetUserById(id)
}

export function updateUser(id:number):User{
    let user = daoGetUserById(id)
    let single = user[0]
    daoUpdateUser(single)
    return single
}

export function updateR(id:number, r:Reimbursement){
    let reimbursement = daoFindRById(id)
    doaUpdateR(reimbursement)
    return reimbursement
}