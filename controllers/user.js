const express = require("express");
const User=require("../models/user")


module.exports.newUserRegRen=async(req,res)=>{
    res.render('users/register')
}

module.exports.newUser=async(req,res,next)=>{
    try{
const {email,username,password}=req.body
const user=new User({
    email,username
})
const data=await User.register(user,password)
 const Usereg=await data.save()
 req.login(Usereg,(err)=>{
     if(err){
return next()}
 })
 req.flash('success','Welcome to Yelp Camp')
 res.redirect('/campgrounds')}
 catch(e){
     req.flash('error',e.message)
     res.redirect('/register')
 }
}

module.exports.UserLoginRen=(req,res)=>{
    res.render('users/login')
}

module.exports.UserLogin=async(req,res)=>{

    req.flash('success','Welcome Back to Campgrounds')
    const redirectUrl=req.session.returnTo||'/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.UserLogOut=(req,res)=>{
    req.logout()
    req.flash('success','You have been Succesfully Logged Out')
    res.redirect('/campgrounds')
}
