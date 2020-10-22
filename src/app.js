const express =require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const PassporLocal = require('passport-local').Strategy;
const usersRoutes = require('./routes/users');

const passport = require('passport');


const cookieParser = require('cookie-parser');
//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Middleware
app.use(cookieParser('secret key'));
app.use(session({
    secret:'secret key',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassporLocal(function(username,password,done){
const users = JSON.parse(localStorage.getItem('users'));
    for (const key in users) {
        const element = users[key];
        if(element['username'] === username){
            if(element['password'] === password){
                return done(null,{id:element['user_id'],'username':element['username']});
                // res.redirect('/');
            }
        }
    }
    done(null,false);
}));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));



//Routes

// app.get("/", (req,res,next) => {
//     if(req.isAuthenticated()) return next();
//     res.redirect("/login");
// },(req, res)=>{
//     res.redirect("/homepage");
// });
app.use('/',usersRoutes);


//Front files
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});