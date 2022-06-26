const express=require('express')
const router = express.Router({ mergeParams: true });

const{isLogged,isreviewAuthor,reviewValidator,wrapAsync}=require('../middleware/middleware')
const{createReview, deleteReview}=require('../controllers/review')

router.post('/',isLogged,reviewValidator,wrapAsync(createReview))
    
    router.delete('/:reId',isreviewAuthor,wrapAsync(deleteReview))
    module.exports=router