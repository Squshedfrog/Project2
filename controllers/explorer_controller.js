const express = require('express')
const app = express()
const router = express.Router()


// ----------- routes --------------------


router.get('/' , ( req , res ) => {
    res.render('home', { message : "" })
})




















// ---------------- export ---------------
module.exports = router