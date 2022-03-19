var mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_trackerdb",
  },
  // console.log("connected to the employee_trackerdb")
)

db.connect(function(err) {
  if (err) throw err
})
module.exports = db