const mysql = require('mysql2');

const pool = mysql.createPool({
    'host': '0.0.0.0',
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME
})

function sqlQuery(query){
    return new Promise((resolve, reject) => {
        pool.getConnection((connectionError, connection) => {
            if(connectionError){
                reject(connectionError);
                return;
            }
            console.log(query)

            connection.query(query, (queryError, results) => {
                if(queryError){
                    reject(queryError);
                } else {
                    resolve(results)
                }
                connection.release();
            })
        })
    })
}

module.exports = {
    query: sqlQuery,
}