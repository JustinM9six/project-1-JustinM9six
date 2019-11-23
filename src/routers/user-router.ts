import express from 'express'
import { getAllUsers, getUserById, updateUser, updateR } from '../services/user-service'
import { reimbursements } from '../database'
import { authorization } from '../middleware/authentication'

export const userRouter = express.Router()

userRouter.get('', [authorization(['Admin', 'Finance-manager'])], (req, res)=>{
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendStatus(500)
    }
})

userRouter.get('/:id', [authorization(['Admin', 'Finanace-manager'])], (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Invalid user id`)
    }else{
        try{
            let user = getUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', [authorization(['Admin'])], (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Please enter a valid user id`)
    }else{
        try{
            let user = updateUser(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', [authorization(['Admin', 'Finance-manager'])], (req, res)=>{
    let id = +req.params.id
    let reimbursement = req.session.user
    try{
        let result = updateR(id, reimbursement)
        res.json(result)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})