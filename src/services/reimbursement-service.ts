import { Reimbursement } from "../models/reimbursement";
import { daoGetRByStatus, daoGetRByUser, daoSubmitR, doaUpdateR } from "../repositories/reimbursement-dao";

export async function getRByStatus(id: number): Promise<Reimbursement[]> {
    try {
        return await daoGetRByStatus(id)
    } catch (e) {
        throw e
    }
}

export async function getRByUser(id: number): Promise<Reimbursement[]> {
    try {
        return await daoGetRByUser(id)
    } catch (e) {
        throw e
    }
}

export async function submitR(r: Reimbursement): Promise<Reimbursement> {
    try {
        return await daoSubmitR(r)
    } catch (e) {
        throw e
    }
}


export async function updateR(id: number, r: Reimbursement): Promise<Reimbursement> {
    try {
        return await doaUpdateR(id, r)
    } catch (e) {
        throw e;
    }
}