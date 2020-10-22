const express = require('express');
const passport = require('passport');
const router = express.Router();


const userController = require('../controllers/userController');

// This check if are loged in
router.get("/", (req,res,next) => {
        if(req.isAuthenticated()) return next();
        res.redirect("/login");
    },userController.list);

router.post('/signup', userController.signup);
router.get('/login', userController.login);
router.post('/login', passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login"
}));
router.post('/saveContact', userController.saveContact);
router.get('/delete/:id', userController.deleContact);
router.get('/edit/:id', userController.editContact);
router.post('/edit', userController.updateContact);
router.get('/editProfile',(req,res,next) => {
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
}, userController.editProfile);
router.post('/editProfile', userController.saveProfile);
router.get('/recovery', userController.recoveryPassword);
router.post('/recovery', userController.sendEmailRecoveryPassword);
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;