import { Reimbursement } from "../models/reimbursement";
import { reimbursements } from "../database";

export function daoGetRByStatus(id:number):Reimbursement[]{
    let r = []
    let i = 0
    for(let find of reimbursements){
        if(find.status === id){
            r[i] = find
            i++
        }
    }
    if(r.length === 0){
        throw{
            status: (404),
            message: `No reimbursements found`
        }
    }else{
        return r
    }
}

export function daoGetRByUser(id:number):Reimbursement[]{
    let r = []
    let i = 0
    for(let find of reimbursements){
        if(find.author === id){
            r[i] = find
            i++
        }
    }
    if(r.length === 0){
        throw{
            status: (404),
            message: `No reimbursements found`
        }
    }else{
        return r
    }
}

export function daoSubmitR(r:Reimbursement):boolean {
    reimbursements.push(r)
    return true;
}

export function daoFindRById(id:number):Reimbursement{
    for(let r of reimbursements){
        if(r.reimbursementId === id){
            return r
        }
    }
    throw{
        status: 404,
        message: `Reimbursement does not exist`
    }
}

export function doaUpdateR(r:Reimbursement){
    let newR = [...reimbursements]
    for(let i = 0; i < newR.length; i++){
        if(newR[i].reimbursementId === r.reimbursementId){
            newR[i] = r
        }
    }
}