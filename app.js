if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}

const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dbUrl=process.env.DB_URL||'mongodb://localhost:27017/yelp-camp'


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

const db=mongoose.connection
db.on('error',console.error.bind(console,'connection-error:'))
db.once('connected',()=>{
    console.log('DataBase Connected')
})
const path=require('path')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const expressError=require('./utills/expressError')
const router=require('./routes/campgrounds')
const reroute=require('./routes/reviews')
const session=require("express-session")
const flash=require("connect-flash")
const req = require('express/lib/request')   
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/user')
const userRoute=require('./routes/users')
const review = require('./models/review')
const mongoSanitize=require('express-mongo-sanitize')
const helmet = require("helmet");
const MongoStore=require("connect-mongo")



app.engine('ejs',ejsMate)
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))
const secret=process.env.SECRET||'thisshouldbeabettersecret!'
const store=new MongoStore({
    mongoUrl:dbUrl,
    secret,
    touchAfter:24*3600
})
store.on("error",(e)=>{
    console.log("STORE ERROR",e)
})

const sessionConfig = {
    store,
    name:'session_1',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        
        // secure:true,
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net", 
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://cdn.jsdelivr.net",
   
    
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dcwpxxcd9/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    res.locals.success=req.flash('success')
    res.locals.error=req.flash("error")
    next()
})


app.use('/',userRoute)
app.use('/campgrounds',router)
app.use('/campgrounds/:id/review',reroute)

app.get('/',(req,res)=>{
    res.render('home')
})


app.use(express.static("public"))

app.all('*',(req,res,next)=>{
    next(new expressError('YOU HAVE ENTERED WRONG CAMP',404))
})
app.use((err,req,res,next)=>{
   const{status=500}=err
 if (!err.message) {
     err.message='Oh No some thing went wrong'
 }
 res.status(status).render('error',{err})
})
const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Serving Port ${port}`)
})
