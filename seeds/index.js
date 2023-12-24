const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require("./cities");
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("Database Connected!!")
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    // const c =new Campground({title:'purple field'});
    // await c.save();
    // for (let i = 0; i < 50; i++) {
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            
            // YOUR USER ID
            author:'656b0ded2f8ae7370644355d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/random/?in-the-woods',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dolor mollitia velit minus voluptatibus, pariatur at temporibus sunt repudiandae suscipit consectetur est, ab dolore magnam voluptate fugit illo incidunt. Nulla!',
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmo0nu8zd/image/upload/v1701924768/YelpCamp/km6tnn6xvs5qf1shnsh0.jpg',
                  filename: 'YelpCamp/km6tnn6xvs5qf1shnsh0'
                },
                {
                  url: 'https://res.cloudinary.com/dmo0nu8zd/image/upload/v1701924772/YelpCamp/cld5srqlubdnw8jlbjdm.jpg',
                  filename: 'YelpCamp/cld5srqlubdnw8jlbjdm'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})