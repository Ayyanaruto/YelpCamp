const express = require("express");
const router=express.Router();
const {wrapAsync}=require('../middleware/middleware')
const passport=require('passport');
const{newUserRegRen, newUser, UserLoginRen, UserLogin, UserLogOut}=require('../controllers/user')
router.route('/register')
    .get(newUserRegRen)
    .post(wrapAsync(newUser))

router.route('/login')
    .get(UserLoginRen)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),UserLogin)

router.get('/logout',UserLogOut)

module.exports=router