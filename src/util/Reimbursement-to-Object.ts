import { Reimbursement } from "../models/reimbursement";
import { ReimbursementDTO } from "../DTOs/reimbursement-DTO";

export function reimburseDTOtoReimburse(rDTO: ReimbursementDTO[]): Reimbursement {
    const status = [];
    const type = [];
    for (const r of rDTO) {
        status.push(r.status);
    }
    for (const r of rDTO) {
        type.push(r.type);
    }
    return new Reimbursement(rDTO[0].reimbursementId, rDTO[0].author, rDTO[0].amount, rDTO[0].dateSubmitted, rDTO[0].dateResolved, rDTO[0].description, rDTO[0].resolver, status[0], type[0]);
}

export function multireimburseDTOtoReimburse(rDTO: ReimbursementDTO[]): Reimbursement[] {
    let currentReimbursement: ReimbursementDTO[] = [];
    const result: Reimbursement[] = [];
    for (const r of rDTO) {
        if(currentReimbursement.length === 0) {
            currentReimbursement.push(r);
        } else if (currentReimbursement[0].reimbursementId === r.reimbursementId) {
            currentReimbursement.push(r);
        } else {
            result.push(reimburseDTOtoReimburse(currentReimbursement));
            currentReimbursement = [];
            currentReimbursement.push(r);
        }
    }
    result.push(reimburseDTOtoReimburse(currentReimbursement));
    return result;
}