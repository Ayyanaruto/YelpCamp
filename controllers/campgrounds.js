const express=require('express')
const Campground=require('../models/model')
const expressError=require('../utills/expressError')
const token=process.env.MAPBOX_TOKEN
const MapGeo=require('@mapbox/mapbox-sdk/services/geocoding')
const geocoder=MapGeo({accessToken:token})
const {cloudinary}=require('../cloudinary')



module.exports.campIndex=async(req,res)=>{
    const camps=await Campground.find({})
    res.render('campgrounds/camp',{camps})
}
module.exports.newCamp=async (req,res,next)=>{
    // if(!req.body)throw new expressError('HELLO',500)
    const geoData=await geocoder.forwardGeocode({
        query:req.body.location,
        limit:1
    }).send()
  const data=req.body
    const base=await new Campground(data)
    base.geometry=geoData.body.features[0].geometry
    base.images=req.files.map(f=>({url:f.path, filename:f.filename}))
    base.author=req.user._id
    await base.save()
    console.log(base)
    req.flash('success', 'Successfully made a new campground!')
    res.redirect('/campgrounds')
}

module.exports.newCampRend=(req,res)=>{
    res.render('campgrounds/new')
}

module.exports.campShow=async(req,res)=>{
    const {id}=req.params
    const show=await Campground.findById(id).populate({
        path:'review',populate:{
            path:'author'
        }
    }).populate('author')
    if(!show){
        req.flash("error","Sorry Cant find That CampGround")
        res.redirect("/campgrounds")
    }
    res.render('campgrounds/show',{show})
}

module.exports.campUpdateRend=async (req,res)=>{
    const {id}=req.params
    const data=await Campground.findById(id)
    res.render('campgrounds/update',{data})
    }

    module.exports.campUpdate=async (req,res)=>{
        const {id}=req.params
        const img=req.files.map(f=>({url:f.path, filename:f.filename})) 
        const camp=await Campground.findByIdAndUpdate(id,req.body)
        camp.images.push(...img)
        
      
        
        if (req.body.deleteimg) {
            for (let filename of req.body.deleteimg) {
                await cloudinary.uploader.destroy(filename);
            }
            await camp.updateOne({ $pull: { images: { filename: { $in: req.body.deleteimg } } } })
        }
        await camp.save()

        req.flash("success","Successfully Upadated th Camp")
        res.redirect(`/campgrounds/${camp._id}`)
    
    }
    module.exports.campDelete=async(req,res)=>{
        const {id}=req.params
        await Campground.findByIdAndDelete(id)
        res.redirect('/campgrounds')
    
    }