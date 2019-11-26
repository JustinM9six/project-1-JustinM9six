import { getUserById } from '../services/user-service';

export function authorization(authRoles: string[]) {

    return async (req, res, next) => {
        let valid = false;
        console.log(req.session.user.role);
        console.log(req.session.user.role.role);

        //Prompt the user to log in if they are not already
        if (!req.session.user) {
            res.status(401).send(`Please log in`);
            return;
        }
        if (authRoles.includes(req.session.user.role.role)) {
            valid = true;
        }
        //if the user id making the request matches the user id they are searching for, allow them access
        const user = await getUserById(req.session.user.user_id);
        if (user.user_id === +req.params.id) {
            valid = true;
        }
        if (valid) {
            next();
        } else {
            //If the logged in user does not have the required permission
            res.status(403).send(`The incoming token has expired`);
        }
    };
}