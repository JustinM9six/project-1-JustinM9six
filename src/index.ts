import express from 'express'
import bodyparser from 'body-parser'
import { getEmployeeLogin } from './services/user-service';
import { userRouter } from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';

const app = express();
app.use(bodyparser.json)

app.post(`/login`, (req, res)=>{
    let {username, password} = req.body
    if(!username || !password){
        res.status(400).send(`Please enter a username and password`)
    }
    try{
        let user = getEmployeeLogin(username, password)
        req.session.user = user
        res.json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})

app.use(`/user`, userRouter)

app.use(`/reimbursement`, reimbursementRouter)