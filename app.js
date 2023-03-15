const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('layout','./layouts/layout.ejs' )






// --------- middleware --------------------

const logger = require('./middleware/logger')
const methodOverride = require('./middleware/methodoverride')
const session = require('./middleware/sessions')
const setCurrentUser = require('./middleware/set_current_user')
const viewHelpers = require('./middleware/view_helper')

app.use(logger)
app.use(methodOverride)
app.use(session)
app.use(setCurrentUser)
app.use(viewHelpers)

// --------- require routes ---------------

const explorerController = require('./controllers/explorer_controller')
const usersController = require('./controllers/users_contoller')
const sessionController = require('./controllers/session_controller')





// ----------- routes --------------------


app.use('/', explorerController)
app.use('/', usersController)
app.use('/', sessionController)













// ---------------- port listener -------------

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`-- ${new Date().toLocaleString()} Server listening on port ${port}`)
})