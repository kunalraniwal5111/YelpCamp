const ExpressError=require("./utils/ExpressError");
const {campgroundSchema,reviewSchema}=require('./schemas');
const Campground=require('./models/campground');
const Review=require('./models/review');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        // console.log('req....user', req.user);
        // console.log(req.path,req.originalUrl);
        req.session.returnTo = req.originalUrl;
        req.flash('error','you must be signed in first')
        // using 'return' so that only one of the statements in our if conditional statement gets executed
        // tackling the header error by using 'return' statement
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo=req.session.returnTo;
    }
    next();
}

module.exports.validateCampground=(req,res,next)=>{
    // const result=campgroundSchema.validate(req.body);
    // extracting our error from our result
    // validating our request body by calling campgroundSchema  
    const {error}=campgroundSchema.validate(req.body);
    // if(result.error){
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
    // console.log(result)
}

module.exports.isAuthor=async(req,res,next)=>{
    const{id}=req.params;
    const campground=await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    const{id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// validating our reviews from the server side 
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else{
        next();
    }
}