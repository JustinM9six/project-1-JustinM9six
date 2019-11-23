import { UserDTO } from "../DTOs/user_DTO";
import { User } from "../models/user";

export function userDTOtoUser(uDTO: UserDTO[]): User {
    const roles = [];
    for (const u of uDTO) {
        roles.push(u.role);
    }
    return new User(uDTO[0].userId, uDTO[0].username, uDTO[0].password, uDTO[0].firstName, uDTO[0].lastName, uDTO[0].email, roles[0])
}

export function multiUserDTOtoUser(uDTO: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uDTO) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].userId === u.userId) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}