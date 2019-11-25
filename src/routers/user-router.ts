import express from 'express'
import { getAllUsers, getUserById, updateUser, updateR } from '../services/user-service'
import { authorization } from '../middleware/authentication'
import { Reimbursement } from '../models/reimbursement'

export const userRouter = express.Router()

userRouter.get('', [authorization(['Admin', 'Finance-manager'])], async (req, res)=>{
    try {
    let users = await getAllUsers()
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

userRouter.get('/:id', [authorization(['Admin', 'Finanace-manager'])], async (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Invalid user id`)
    }else{
        try{
            let user = await getUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('/:id', [authorization(['Admin'])], async (req, res)=>{
    let id = +req.params.id
    if(isNaN(id)){
        res.status(400).send(`Please enter a valid user id`)
    }else{
        try{
            let user = await updateUser(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('', [authorization(['Admin', 'Finance-manager'])], async (req, res)=>{
    let id = +req.params.id
    const { body } = req;
    const reimburse = new Reimbursement(0, 0, 0 ,0, 0, ``, 0, 0, 0);
    for (const key in reimburse) {
        if (body[key] === undefined) {
            reimburse[key] = undefined;
        } else {
            reimburse[key] = body[key];
        }
    }
    try{
        const result = await updateR(id, reimburse)
        res.status(201).json(result)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})