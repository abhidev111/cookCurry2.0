

const Pool = require("pg").Pool; 
const pool = new Pool({
    user : 'postgres',
    password: 'one1000one',
    database : 'DBMS_cookCurry',
    port : '5432',
    host : '65.2.38.82'
})

module.exports = pool;