import { Reimbursement } from "../models/reimbursement";
import { daoGetRByStatus, daoGetRByUser, daoSubmitR } from "../repositories/reimbursement-dao";

export async function getRByStatus(id:number):Promise<Reimbursement[]>{
    return await daoGetRByStatus(id)
}

export async function getRByUser(id:number):Promise<Reimbursement[]>{
    return await daoGetRByUser(id)
}

export async function submitR(r:Reimbursement):Promise<Reimbursement>{
    return await daoSubmitR(r)
}