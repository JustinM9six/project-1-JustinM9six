import express from 'express'
import { getRByStatus, getRByUser, submitR } from '../services/reimbursement-service'
import { Reimbursement } from '../models/reimbursement'
import { authorization } from '../middleware/authentication'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', [authorization(['Admin', 'Finance-manager'])], async (req, res)=>{
    let id = +req.params.statusId
    if(isNaN(id)){
        res.status(400).send(`Please enter a valid Status id`)
    }else{
        try{
            let reimbursements = await getRByStatus(id)
            res.json(reimbursements)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/userId/:userId', [authorization(['Admin', 'Finance-manager'])], async (req, res)=>{
    let id = +req.params.userId
    if(isNaN(id)){
        res.status(400).send(`Please enter a valid User id`)
    }else{
        try{
            let reimbursements = await getRByUser(id)
            res.json(reimbursements)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('', [authorization(['Admin', 'Finance-manager', 'User'])], (req, res)=>{
    let{body} = req
    let{author} = body
    let newR = new Reimbursement(0, 0, 0, 0, 0, ``, 0, 0, 0)
    for(let key in newR){
        if(body[key] === undefined){
            res.status(400).send(`Please include all required fields`)
            break;
        }else{
            newR[key] = body[key]
        }
    }
    if(!author){
        res.status(400).send(`Please include all reimbursement fields`)
    }
    for(let key in newR[`user`]){
        if(author[key] === undefined){
            res.status(400).send(`Please include all reimbursement fields`)
            break;
        }else{
            newR[`user`][key] = author[key]
        }
    }
    try{
        let result = submitR(newR)
        if(result){
            res.sendStatus(201)
        }
    }catch(e){
        res.status(e.status).send(e.message)
    }
})