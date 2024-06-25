const mysql=require('mysql');
let connectionPool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:"",
    database:"school",
    waitForConnections:true,
    queueLimit:0
})

module.exports= connectionPool