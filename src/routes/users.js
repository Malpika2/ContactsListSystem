const express = require('express');
const passport = require('passport');
const router = express.Router();


const userController = require('../controllers/userController');

router.get('/', userController.list);
router.post('/signup', userController.signup);
router.get('/login', userController.login);
router.post('/login', passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login"
}));

module.exports = router;