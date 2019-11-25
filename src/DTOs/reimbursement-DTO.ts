export class ReimbursementDTO {
    reimbursement_id: number
    author: number
    amount: number
    date_submitted: number
    date_resolved: number
    description: string
    resolver: number
    statusId: number
    status: string
    typeId: number
    type: string
}