import express from 'express'
import { getAllUsers, getUserById, updateUser } from '../services/user-service'
import { authorization } from '../middleware/authentication'
import { User } from '../models/user'
import { Role } from '../models/role'

export const userRouter = express.Router()

userRouter.get('', [authorization(['Admin', 'Finance-manager'])], async (req, res) => {
    try {
        let users = await getAllUsers()
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

userRouter.get('/:id', [authorization(['Admin', 'Finanace-manager'])], async (req, res) => {
    let id = +req.params.id
    if (isNaN(id)) {
        res.status(400).send(`Invalid user id`)
    } else {
        try {
            let user = await getUserById(id)
            res.json(user)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

userRouter.patch('/:id', [authorization(['Admin'])], async (req, res) => {
    let id = +req.params.id
    const { body } = req;
    if (isNaN(id)) {
        res.status(400).send(`Please enter a valid user id`)
    }
    const user = new User(0, ``, ``, ``, ``, ``, new Role(0, ``))
    for (const key in user) {
        if (body[key] === undefined) {
            user[key] = undefined;
        } else {
            user[key] = body[key];
        }
    }
    try {
        const result = await updateUser(id, user)
        res.status(201).json(result)
    } catch (e) {
        res.status(e.status).send(e.message)
    }
})