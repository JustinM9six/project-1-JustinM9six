import express from 'express'
import { getAllUsers, getUserById, updateUser, updateR } from '../services/user-service'
import { reimbursements } from '../database'

export const userRouter = express.Router()

userRouter.get('', (req, res)=>{
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendStatus(500)
    }
})

userRouter.get('/:id', (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Please enter a user id`)
    }else{
        try{
            let user = getUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Please enter a valid user id`)
    }else{
        let {body} = req
        try{
            let user = updateUser(id, body[0], body[1])
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch(':/id', (req, res)=>{
    let id = +req.params.id
    let reimbursement = req.session.user
    try{
        let result = updateR(id, reimbursement)
        res.json(result)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})