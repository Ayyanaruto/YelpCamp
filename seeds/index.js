const res = require('express/lib/response')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const db=mongoose.connection
db.on('error',console.error.bind(console,'connection-error:'))
db.once('connected',()=>{
    console.log('DataBase Connected')
})
const axios=require('axios')
const Campground=require('../models/model')
const cities=require('./cities')
const{descriptors,places}=require('./descriptor')
const sample=array=>array[Math.floor(Math.random()*array.length)]
const seed=async()=>{
await Campground.deleteMany({})
for(let i=0;i<50;i++){
    const random1000=Math.floor(Math.random()*1000)
    const camp=new Campground({
        title:`${sample(descriptors)} ${sample(places)}`,
        location:`${cities[random1000].city},${cities[random1000].state}`,
        author:'6214f2a555c36d3c5c77b912',
        price:`${Math.floor(Math.random()*10000)/100}`,
        geometry: { type: 'Point', coordinates: [cities[random1000].longitude,cities[random1000].latitude ] },
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, vel officia? Officia nemo illum eveniet nulla voluptatum necessitatibus, in deserunt maxime consectetur enim blanditiis ad, minus perferendis repellendus officiis earum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, vel officia? Officia nemo illum eveniet nulla voluptatum necessitatibus, in deserunt maxime consectetur enim blanditiis ad, minus perferendis repellendus officiis earum',
        images:[
            {
              url: 'https://res.cloudinary.com/dcwpxxcd9/image/upload/v1647874404/YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_xe1xk3.jpg',
              filename: 'YelpCamp/tommy-lisbin-2DH-qMX6M4E-unsplash_xe1xk3.jpg',
             
            },
            {
              url: 'https://res.cloudinary.com/dcwpxxcd9/image/upload/v1647874403/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_x2nmeb.jpg',
              filename: 'YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_x2nmeb.jpg',
              
            },
            {
              url: 'https://res.cloudinary.com/dcwpxxcd9/image/upload/v1647874402/YelpCamp/tegan-mierle-fDostElVhN8-unsplash_jh2oj3.jpg',
              filename: 'YelpCamp/tegan-mierle-fDostElVhN8-unsplash_jh2oj3.jpg',
              
            }
          ]
    })
    await camp.save()
}
}
seed().then(res=>{
    mongoose.connection.close
})