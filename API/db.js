

const Pool = require("pg").Pool; //or const { Pool } = require('pg')


const pool = new Pool({
    user : 'postgres',
    password: 'one1000one',
    database : 'DBMS_cookCurry',
    port : '5432',
    host : '65.2.38.82'
    // user : process.env.USER,
    // password : process.env.PASSWORD,
    // database : process.env.DATABASE,
    // port : process.env.DBPORT,
    // host : process.env.HOST

})

module.exports = pool;