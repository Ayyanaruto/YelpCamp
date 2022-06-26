const express=require('express')
const Campground=require('../models/model')
const expressError=require('../utills/expressError')
const {schema}=require('../views/schemas')
const Review=require('../models/review')
const {reviewSchemas}=require('../views/schemas')



module.exports.Validator=(req,res,next)=>{
    const{error}=schema.validate(req.body)
  
   if(error)
   {   const result=error.details.map(e=>e.message).join(',')
       throw new expressError(result,400)}
   else{
       next()
   }
 
 }

 module.exports.isAuthor= async(req,res,next)=>{
    const {id}=req.params
    const re= await Campground.findById(id)
    if(!re.author.equals(req.user.id)){
        req.flash('error','YOU DO NOT HAVE PERMISSION')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.reviewValidator=(req,res,next)=>{
    const{error}=reviewSchemas.validate(req.body.review)
    
   if(error)
   {
    const result=error.details.map(e=>e.message).join(',')
       throw new expressError(result,400)}
   else{
       next()
   }
 
 }

 module.exports.isreviewAuthor= async(req,res,next)=>{
    const {reId,id}=req.params
    const re= await Review.findById(reId)
    if(!re.author.equals(req.user)){
        req.flash('error','YOU DO NOT HAVE PERMISSION')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isLogged=(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.flash('error','Please Sign in First')
        req.session.returnTo=req.originalUrl
        res.redirect('/login')
    }
    next()}

    
module.exports.wrapAsync=function(fn) {
    return function(req,res,next){
        fn(req,res,next).catch(next)
    }
    
}