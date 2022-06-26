const mongoose=require('mongoose')
const {Schema}=mongoose
const passportLocalMong=require('passport-local-mongoose')

const userSchema=new Schema({
    email:{
        type:String,required:[true,'Email is required'],unique:true
    }
})
userSchema.plugin(passportLocalMong)

module.exports=mongoose.model('User',userSchema)