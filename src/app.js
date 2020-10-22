const express =require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

const {users, contacts } = require('./data');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));


//Routes

const usersRoutes = require('./routes/users');
const { urlencoded } = require('express');
app.use('/',usersRoutes);


//Front files
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});