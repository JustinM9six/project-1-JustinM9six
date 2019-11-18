import { Reimbursement } from "../models/reimbursement";
import { daoGetAllRequests } from "../repositories/manager-dao";

export function getAllRequests():Reimbursement[]{
    return daoGetAllRequests()
}

export function updateOneRequest(){}