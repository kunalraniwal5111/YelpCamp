const express=require('express');
const router=express.Router();
const passport=require('passport');
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const users=require('../controllers/users');

// restructuring our routes using router.route method

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login)


// restructuring our routes with router

// router.get('/register',users.renderRegister);
// router.post('/register',catchAsync(users.register));

// router.get('/login',users.renderLogin)
// router.post('/login',storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login)

router.get('/logout',users.logout)


module.exports=router;