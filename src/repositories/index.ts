import {Pool} from 'pg'

export const connectionPool:Pool = new Pool({
    user: process.env['GARDEN_BOOK_USERNAME'],
    host: process.env['GARDEN_BOOK_HOST'],
    database: process.env['GARDEN_BOOK_DATABASE'],
    password: process.env['GARDEN_BOOK_PASSWORD'],
    port: 5432,
    max: 5,
})