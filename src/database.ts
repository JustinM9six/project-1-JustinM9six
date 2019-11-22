import { User } from "./models/user";
import { Role } from "./models/role";
import { ReimbursementType } from "./models/reimbursementType";
import { ReimbursementStatus } from "./models/reimbursementStatus";
import { Reimbursement } from "./models/reimbursement";

export let users = [
    new User(1, `boss`, `password`, `John`, `Doe`, `jDoe@gmail.com`, new Role(1, `admin`)),
    new User(2, `jHoitsman`, `password`, `Jeffery`, `Hoitsman`, `jHoit@gmail.com`, new Role(2, `finance-manager`)),
]

export let roles = [
    new Role(1, `admin`),
    new Role(2, `finance-manager`),
    new Role(3, `employee`),
]

export let reimbursementTypes = [
    new ReimbursementType(1, `Lodging`),
    new ReimbursementType(2, `Travel`),
    new ReimbursementType(3, `Food`),
    new ReimbursementType(4, `Other`),
]

export let reimbursementStatus = [
    new ReimbursementStatus(1, `Pending`),
    new ReimbursementStatus(2, `Approved`),
    new ReimbursementStatus(3, `Denied`),
]

export let reimbursements = [
    new Reimbursement(1, 3, 100, 10.2, null, `hotel costs`, 2, 1, 2),
]