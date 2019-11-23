import { users } from "../database";
import { User } from "../models/user";
import { connectionPool } from ".";
import { PoolClient } from "pg";
import { multiUserDTOtoUser } from "../util/User-to-Object";

export async function daoGetUserLogin(username:string, password:string){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM Project_0.user natural join Project_0.user_roles naturla join Project_0.roles WHERE username = $1 AND password = $2',
        [username, password]);
        if (result.rowCount === 0) {
            throw 'Bad credentials';
        } else {
            return 
        }
    } catch (e) {
        console.log(e);
        if(e === 'Bad credentials') {
            throw {
                status: 401,
                message: 'Bad credentials'
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
        let result = await client.query('SELECT * FROM Project_0.user natural join Project_0.user_role natural join Project_0.role')
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

export function daoGetUserById(id:number):User[]{
    let u = []
    let i = 0
    for(let find of users){
        if(find.userId === id){
            u[i] = find
            i++
        }
    }
    if(u.length === 0){        
        throw{
            status: 404,
            message: `There are no users with this id`
        }
    }else{
        return u
    }
}

export function daoUpdateUser(find:User):User{
    return null
}