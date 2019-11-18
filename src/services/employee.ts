import { Reimbursement } from "../models/reimbursement";
import { daoGetAllTickets, daoSubmitOneTicket } from "../repositories/employee-dao";

export function getAllTickets():Reimbursement[]{
    return daoGetAllTickets()
}

export function submitOneTicket(r:Reimbursement){
    return daoSubmitOneTicket(r)
}