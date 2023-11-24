const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const validateController = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthenticationMiddleware')
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb+srv://jaspreetkaur5950:test123@cluster0.hxnfh2a.mongodb.net/Assignmentdatabase?retryWrites=true&w=majority' , {useNewUrlParser:true})
const app = new express()
global.loggedIn = null;
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store',validateController)
app.use(expressSession({
    secret :'Jaspreet'
}))
app.use('*', (req, res, next) =>{
    loggedIn = req.session.userId;
    next()
})
app.use(flash());
app.listen(3000, () => {
    console.log('App listening on port 3000')
})
app.get('/', homePageController)

app.post('/posts/store',authMiddleware,storePostController)
app.get('/post/new',authMiddleware,newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectIfAuthMiddleware,newUserController)

app.post('/user/register',redirectIfAuthMiddleware,storeUserController)
app.get('/auth/login',redirectIfAuthMiddleware,loginController)
app.post('/user/login',redirectIfAuthMiddleware,loginUserController)
app.get('/auth/logout',logoutController)
app.use((req,res)=> res.render('notfound'));