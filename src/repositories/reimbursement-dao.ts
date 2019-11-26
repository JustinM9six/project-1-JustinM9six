import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multireimburseDTOtoReimburse, reimburseDTOtoReimburse } from "../util/Reimbursement-to-Object";

export async function daoGetRByStatus(id:number):Promise<Reimbursement[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0.reimbursement r full outer join project_0.reimbursement_status s on r.status = s.statusId full outer join project_0.reimbursement_type t on r."type" = t.typeId WHERE r.status = $1;`, [id])
        if(result.rowCount > 0) {
            return multireimburseDTOtoReimburse(result.rows);
        } else {
            throw 'There are no reimbursements with this status';
        }
    } catch (e) {
        console.log(e);
        
        throw{
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetRByUser(id:number):Promise<Reimbursement[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0.reimbursement r full outer join project_0.reimbursement_status s on r.status = s.statusId full outer join project_0.reimbursement_type t on r."type" = t.typeId WHERE r.author = $1;`, [id])
        if(result.rowCount > 0) {
            return multireimburseDTOtoReimburse(result.rows);
        } else {
            throw 'There are no reimbursements from this user';
        }
    } catch (e) {
        throw{
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoSubmitR(r:Reimbursement):Promise<Reimbursement> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        await client.query(`BEGIN`);
        await client.query(`INSERT INTO project_0.reimbursement(reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, "type") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING reimbursement_id;`, 
        [r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type]);
        await client.query(`COMMIT`);
        return r;
    } catch (e) {
        await client.query(`ROLLBACK`);        
        throw {
            status: 500,
            message: `Internal Server Error`
        };
    } finally {
        client && client.release();
    }
}

export async function doaUpdateR(id: number, r:Reimbursement): Promise<Reimbursement>{
    let client: PoolClient
    client = await connectionPool.connect();
    try {
        const temp = await client.query(`SELECT * FROM project_0.reimbursement WHERE reimbursement_id = $1`, [id])
        const tempReimburse = reimburseDTOtoReimburse(temp.rows)
        for(const key in r){
            if (r[key] === undefined){
                r[key] = tempReimburse[key]
            }
        }    
            await client.query(`UPDATE project_0.reimbursement SET reimbursement_id = $1,  
            author = $2, amount = $3, date_submitted = $4, date_resolved = $5, description = $6, 
            resolver = $7, status = $8, type = $9 WHERE reimbursement_id = $10;`, 
            [r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type, id]);
            return r;
    } catch (e) {
        throw {            
            status: 500,
            message: `Internal Server Error`
        }
    } finally {
        client && client.release();
    }
}