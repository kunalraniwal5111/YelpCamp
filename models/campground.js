const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./review')

// https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png

const ImageSchema=new Schema({
    url:String,
    filename:String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
})

const opts={ toJSON: {virtuals:true}};


const campgroundSchema=new Schema({
    title:String,
    images:[ImageSchema],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts);

// registered a virtual property
campgroundSchema.virtual('properties.popUpMarkup').get(function(){
    // return "I AM POPUP TEXT"
    // 'this' refers to the particular campground instance
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0,20)}...</p>
    `
})




campgroundSchema.post('findOneAndDelete',async function(doc){
    // console.log("deleted@!")
    if(doc){
        await Review.deleteMany({
            _id:{$in:doc.reviews}
        })
    }
})

module.exports=mongoose.model('Campground', campgroundSchema);

// https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png