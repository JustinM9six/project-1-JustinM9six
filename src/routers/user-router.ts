import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../services/user-service';
import { authorization } from '../middleware/authentication';
import { User } from '../models/user';
import { Role } from '../models/role';

export const userRouter = express.Router();

//Get all users
userRouter.get('', [authorization(['Admin', 'Finance-manager']), async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}]);

//Get user by ID
userRouter.get('/:id', [authorization(['Admin', 'Finanace-manager']), async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).send(`Invalid user id`);
    } else {
        try {
            const user = await getUserById(id);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
}]);

//Update a user
userRouter.patch('', [authorization(['Admin']), async (req, res) => {
    //let id = +req.params.id
    const { body } = req;
    // if (isNaN(id)) {
    //     res.status(400).send(`Please enter a valid user id`)
    // }
    //Creating a new user and then setting any unentered values to undefined
    const user = new User(0, ``, ``, ``, ``, ``, new Role[0]);
    for (const key in user) {
        if (body[key] === undefined) {
            user[key] = undefined;
        } else {
            user[key] = body[key];
        }
    }
    const id = user.user_id;
    //Check if the user entered an id
    if (isNaN(id)) {
        res.status(400).send(`Please enter a valid user id`);
    }
    try {
        const result = await updateUser(id, user);
        res.status(201).json(result);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}]);