# 🏕 YelpCamp

<a href="https://my-campground.herokuapp.com/">
 <p align="center">
  <img src="https://i.imgur.com/F6IiDsR.png?w="350" alt="Campground"
 </p>
</a>

YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.  

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.  
#### 📲 <a href="https://yelpcamp-7pea.onrender.com">View Demo</a>

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
* Search campground by name or location
* Can pinpoint the Location on map with built in map
* Sort campgrounds by highest rating, most reviewed, lowest price, or highest price

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone https://github.com/leovenom/YelpCamp.git
cd YelpCamp
npm install
```
## Built With
   ![HTML5](https://img.shields.io/badge/HTML5%20-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
   ![CSS3](https://img.shields.io/badge/CSS%20-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
 ![BOOTSTRAP](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![NODE](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/Ejs-FFA500?style=for-the-badge&logo=ejs&logoColor=white)

### Api's
  ![MAPBOX](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)
      ![UNSPLASH](https://img.shields.io/badge/Unsplash-4EA94B?style=for-the-badge&logo=unsplash&logoColor=white)





Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).
