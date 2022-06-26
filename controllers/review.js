const express=require('express')
const Review=require('../models/review')
const Campground=require('../models/model')

module.exports.createReview=async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const reviews = new Review(req.body.review);

    reviews.author = req.user._id;
    campground.review.push(reviews);
    await reviews.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
    }

    module.exports.deleteReview=async(req,res)=>{
        const{id,reId}=req.params
        await Campground.findByIdAndUpdate(id,{$pull:{review:reId}})
        await Review.findByIdAndDelete(reId)
        res.redirect(`/campgrounds/${id}`)
    }