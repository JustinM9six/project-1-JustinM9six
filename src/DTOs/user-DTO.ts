//A join between the user and roles tables
export class UserDTO {
    user_id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    role: string;
}