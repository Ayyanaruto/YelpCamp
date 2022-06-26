const express=require('express')
const router=express.Router()
const Campground=require('../models/model')
const expressError=require('../utills/expressError')
const {schema}=require('../views/schemas')
const {isLogged,Validator,wrapAsync,isAuthor}=require('../middleware/middleware')
const{campIndex, newCamp, newCampRend, campShow, campUpdateRend, campUpdate, campDelete}=require('../controllers/campgrounds')
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({storage })

router.route('/')
  .get(campIndex)
  .post(isLogged,upload.array('image'),Validator,wrapAsync(newCamp))


router.get('/new',isLogged,newCampRend)

router.route('/:id')
  .get(wrapAsync(campShow))
  .put(isLogged,upload.array('image'),isAuthor,Validator,wrapAsync(campUpdate))
  .delete(isLogged,isAuthor,wrapAsync(campDelete))

router.get('/:id/update',isLogged,isAuthor,wrapAsync(campUpdateRend))

module.exports=router
