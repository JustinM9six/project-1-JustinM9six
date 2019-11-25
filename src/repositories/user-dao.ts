import { User } from "../models/user";
import { connectionPool } from ".";
import { PoolClient } from "pg";
import { multiUserDTOtoUser, userDTOtoUser } from "../util/User-to-Object";

export async function daoGetUserLogin(username:string, password:string): Promise<User>{
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        
        const result = await client.query(`SELECT * FROM project_0."user" natural join project_0.user_role natural join project_0."role" where username = $1 and password = $2`,
        [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid credentials';
        } else {            
            return userDTOtoUser(result.rows)
        }
    } catch (e) {
        console.log(e);
        if(e === 'Invalid credentials') {
            throw {
                status: 401,
                message: 'Invalid credentials'
            };
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

export async function daoGetAllUsers():Promise<User[]>{
    let client:PoolClient
    try{        
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.user natural join project_0.user_role natural join project_0.role')
        return multiUserDTOtoUser(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(id:number):Promise<User[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0."user" natural join project_0.user_role natural join project_0."role" WHERE user_id = $1`, [id]);
        if (result.rowCount > 0) {
            return multiUserDTOtoUser(result.rows);
        } else {
            throw 'There are no Users with this ID';
        }
    } catch (e) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    } finally {
        client && client.release();
    }
}

export async function daoUpdateUser(find:User, id:number):Promise<User>{
    let client: PoolClient
    let result
    try {
        client = await connectionPool.connect();
        for(const key in find){
            if (find[key] === undefined){
                //let temp = await client.query(`SELECT $1 FROM project_0.reimbursement WHERE reimbursementId = $2`, [Object.keys(find[key]), id]);
                //let result = await client.query(`UPDATE project_0.reimbursement SET $1 WHERE reimbursementId = $2`, [temp, id]);
            } else {
                result = await client.query(`UPDATE project_0.reimbursement SET $1 WHERE reimbursementId = $2`, [find[key], id]);
            }
        }
        return result
    } catch (e) {
        throw {
            status: 500,
            message: `Internal Server Error`
        }
    } finally {
        client && client.release();
    }
}