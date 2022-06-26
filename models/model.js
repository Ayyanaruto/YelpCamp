const { string } = require('joi');
const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Review=require('./review')
const User=require('./user')
const opts = { toJSON: { virtuals: true } };

const YelpSchema=new Schema({
    title:String,
    images:[{
        url:String,
        filename:String
    }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price:Number,
    description:String,

    location:String,
    author:{
        type:Schema.Types.ObjectId,ref:'User'
    },
    review:[{
        type:Schema.Types.ObjectId,ref:'Review'
    }]
},opts)
YelpSchema.virtual("properties.popup").get(function(){
    return`<a href="/campgrounds/${this.id}">${this.title}</a>`
})
YelpSchema.post('findOneAndDelete',async(doc)=>{
if(doc){
     await Review.remove({_id:{
    $in:doc.review
    }})
}
})
module.exports=mongoose.model('Campground',YelpSchema)