import { Reimbursement } from "../models/reimbursement";
import { daoGetRByStatus, daoGetRByUser, daoSubmitR } from "../repositories/reimbursement-dao";

export function getRByStatus(id:number):Reimbursement[]{
    return daoGetRByStatus(id)
}

export function getRByUser(id:number):Reimbursement[]{
    return daoGetRByUser(id)
}

export function submitR(r:Reimbursement){
    return daoSubmitR(r)
}