import { Reimbursement } from "../models/reimbursement";
import { users } from "../database";
import { User } from "../models/user";

export function daoGetUserLogin(username:string, password:string){
    for(let u of users){
        if(u.username === username && u.password === password){
            return u
        }
    }
    throw{
        status: 400,
        message: `Invalid Credentials`
    }
}

export function daoGetAllUsers():User[]{
    return users
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
            message: `There are no user with this id`
        }
    }else{
        return u
    }
}

export function daoUpdateUser(id:number, field:string, update:string):User{
    for(let u of users){
        if(u.userId === id){
            for(let key in u){
                if(u[key] === field){
                    u[key] = field
                    return u
                }
            }
            throw{
                status: 404,
                message: 'Field not found'
            }
        }
    }
    throw{
        status: 404,
        message: 'User not found'
    }
}