const express = require('express')
const app = express()
const router = express.Router()
const db = require('../database/db');
const bcrypt = require('bcrypt');



// ----------- routes --------------------


router.get('/users', (req , res ) => {
    res.render('./users/signup-form', { message : '' })
})

router.post('/users/new', ( req , res ) => {
    const email = req.body.email
    const firstName = req.body.first_name;
    const surname = req.body.surname;
    const myPlaintextPassword = req.body.password

    const sql = `SELECT * FROM users WHERE email = '${email}';`;
    console.log(sql)
    db.query( sql , ( err , dbRes ) => {
        if (dbRes.rows.length === 0) {
            bcrypt.genSalt(10, (err , salt) => {

            bcrypt.hash(myPlaintextPassword, salt, (err, digestedPassword) => {
    
                const sql = `
                INSERT INTO users ( points , email , first_name , last_name , password_digest)
                VALUES ( 0 , $1 , $2 , $3 , '${digestedPassword}');`
                
                db.query(sql,[ email , firstName , surname ] , (err , dbRes) => {
                //console.log(err)
                
                }) 
            
                
            })
            //------------------- need to update / path user registered --------------------
            res.redirect('/')    
        })} else {
            const message = 'The Email you have entered is already registed';
            res.render('./users/signup-form', { message :message })    
        }
    //------------------- need to update / path email already exists registered --------------------
    })
    
})
















// ---------------- export ---------------
module.exports = router