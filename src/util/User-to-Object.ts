import { UserDTO } from "../DTOs/user-DTO";
import { User } from "../models/user";
import { Role } from "../models/role";

export function userDTOtoUser(uDTO: UserDTO[]): User {
    const roles = new Role(uDTO[0].role_id, uDTO[0].role);  
    return new User(uDTO[0].user_id, uDTO[0].username, uDTO[0].password, uDTO[0].first_name, uDTO[0].last_name, uDTO[0].email, roles)
}

export function multiUserDTOtoUser(uDTO: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uDTO) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].user_id === u.user_id) {
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