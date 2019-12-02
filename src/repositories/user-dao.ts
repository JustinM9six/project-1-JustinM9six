import { User } from '../models/user';
import { connectionPool } from '.';
import { PoolClient } from 'pg';
import { multiUserDTOtoUser, userDTOtoUser } from '../util/User-to-Object';

//Login
export async function daoGetUserLogin(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0."user" natural join project_0.user_role natural join project_0."role" where username = $1 and password = $2`,
            [username, password]);
        //const passwordHash = require(`password-hash`);
        //const hashedPassword = passwordHash.generate(`password`);
        //If no users are found that match the entered username or password
        if (result.rowCount === 0) {
            throw 'Invalid credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'Invalid credentials') {
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
        //Closing the connection
    } finally {
        client && client.release();
    }
}

//Get all the users
export async function daoGetAllUsers(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.user natural join project_0.user_role natural join project_0.role');
        return multiUserDTOtoUser(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
        //Closing the connection
    } finally {
        client && client.release();
    }
}

//Get user by ID
export async function daoGetUserById(id: number): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`SELECT * FROM project_0."user" natural join project_0.user_role natural join project_0."role" WHERE user_id = $1`, [id]);
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows);
        } else {
            throw 'There are no Users with this ID';
        }
    } catch (e) {
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
        //Closing the connection
    } finally {
        client && client.release();
    }
}

export async function daoUpdateUser(id: number, u: User): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        const temp = await client.query(`SELECT * FROM project_0."user" natural join project_0.user_role natural join project_0."role" WHERE user_id = $1`, [id]);
        if (temp.rows.length === 0) {
            throw {
                status: 404,
                message: `There are no users with this ID`
            };
        }
        const tempUser = userDTOtoUser(temp.rows);
        for (const key in u) {
            if (u[key] === undefined) {
                u[key] = tempUser[key];
            }
        }
        await client.query(`update project_0.user SET user_id = $1, username = $2,
        first_name = $3, last_name = $4, email = $5 WHERE user_id = $6`,
            [u.user_id, u.username, u.first_name, u.last_name, u.email, id]);
        return u;
    } catch (e) {
        if (e.status !== 404) {
            throw {
                status: 500,
                message: `Internal Server Error`
            };
        } else {
            throw e;
        }
    } finally {
        client && client.release();
    }
}