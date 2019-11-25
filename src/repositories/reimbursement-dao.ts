import { Reimbursement } from "../models/reimbursement";
import { PoolClient } from "pg";
import { connectionPool } from ".";
import { multireimburseDTOtoReimburse } from "../util/Reimbursement-to-Object";

export async function daoGetRByStatus(id:number):Promise<Reimbursement[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0.reimbursement r full outer join project_0.reimbursementStatus s on r.status = s.statusId full outer join project_0.reimbursementType t on r."type" = t.typeId WHERE r.status = $1;`, [id])
        if(result.rowCount > 0) {
            return multireimburseDTOtoReimburse(result.rows);
        } else {
            throw 'There are no reimbursements with this status';
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

export async function daoGetRByUser(id:number):Promise<Reimbursement[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0.reimbursement r full outer join project_0.reimbursementStatus s on r.status = s.statusId full outer join project_0.reimbursementType t on r."type" = t.typeId WHERE r.author = $1;`, [id])
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
        await client.query('BEGIN');
        const result = await client.query(`INSERT INTO project_0.reimbursement(reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, "type") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
        [r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type]);
            await client.query(`INSERT INTO project_0.reimbursementType VALUES($1, $2)`, [result.rows[0].reimbursement_id, r.type]);
            await client.query(`INSERT INTO project_0.reimbursementStatus VALUES($1, $2)`, [result.rows[0].reimbursement_id, 1]);
        r.reimbursement_id = result.rows[0].reimbursement_id;
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

export async function doaUpdateR(id: number, r:Reimbursement){
    let client: PoolClient
    try {
        client = await connectionPool.connect();
        for(const key in r){
            if (r[key] === undefined){
                //let temp = await client.query(`SELECT $1 FROM project_0.reimbursement WHERE reimbursement_id = $2`, [Object.keys(r[key]), id]);
                //let result = await client.query(`UPDATE project_0.reimbursement SET $1 WHERE reimbursement_id = $2`, [temp, id]);
            } else {
                await client.query(`UPDATE project_0.reimbursement SET $1 WHERE reimbursement_id = $2`, [r[key], id]);
            }
        }
    } catch (e) {
        throw {
            status: 500,
            message: `Internal Server Error`
        }
    } finally {
        client && client.release();
    }
}