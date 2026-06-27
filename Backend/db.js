import mysql from "mysql2/promise";
const connection=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"kumkum",
    database:"quiz_app"
})

export default connection;
console.log("Database Connection");
