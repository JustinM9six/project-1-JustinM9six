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

export async function daoUpdateUser(id: number, u:User):Promise<User>{
    let client: PoolClient
    client = await connectionPool.connect();
    try {
        const temp = await client.query(`SELECT * FROM project_0.user WHERE user_id = $1;`, [id])
        const tempUser = userDTOtoUser(temp.rows)
        for(const key in u){
            if (u[key] === undefined){
                u[key] = tempUser[key]
            }
        }
        await client.query(`update project_0.user SET user_id = $1, username = $2, 
        "password" = $3, first_name = $4, last_name = $5, email = $6 WHERE user_id = $7`, 
        [u.user_id, u.username, u.password, u.first_name, u.last_name, u.email, id])
        return u
    } catch (e) {
        console.log(e);
        
        throw {            
            status: 500,
            message: `Internal Server Error`
        }
    } finally {
        client && client.release();
    }
}