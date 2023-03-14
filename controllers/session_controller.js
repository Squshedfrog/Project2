const express = require('express')
const app = express()
const router = express.Router()
const db = require('../database/db');
const bcrypt = require('bcrypt');



router.get( "/session", ( req , res ) => {
    res.render('./users/login-form')
})

router.post( "/sessions/login" , ( req, res ) => {
    const email = req.body.email
    const password = req.body.password
    const sql = `SELECT * FROM users WHERE email = $1;`
    
    db.query(sql, [email] , (err, dbRes) => {
        
        
        // console.log(`check db response ${dbRes.rows[0].first_name}`)
        if ( dbRes.rows.length === 0 ){

        // user not found re enter or .....
           res.render('./users/login-form', { message : 'user not found re enter or .....' })
           return
        }   
        const user = dbRes.rows[0]
        bcrypt.compare(password, dbRes.rows[0].password_digest, (err ,result) => {
                if (result) {
                //logged in

                
                req.session.userId = user.id
                
                
                res.redirect('/')

            } else {
                //incorrect password
                res.render('./users/login-form', { message : 'Incorrect password' })
            }
        })
    })
})

router.delete( "/sessions/logout" , ( req , res ) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})













// ---------------- export ---------------
module.exports = router