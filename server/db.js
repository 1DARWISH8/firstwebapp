// import mongoose
const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL= process.env.LOCAL_DB_URL;
// const DB_URL= process.env.ATLAS_DB_URL;

// connect to DATABASE
mongoose.connect(DB_URL)
.then(()=>console.log("DB CONNECTED"))
.catch(err=>console.log(err))

// CREATE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        userType:String,
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"],
            minLength:[4,"Minimum Length should be greater than 4"],
            maxLength:[10,"Maximum Length should be less than 10"],
        },
        password:
        {
            type:String,
            required:[true,"PASSWORD IS REQUIRED"],
            minLength:[4,"Minimum Length should be greater than 4"],
        },
        email:
        {
            type:String,
            required:[true,"EMAIL IS REQUIRED"]
        },
        address:
        {
            type:String,
            required:[true,"ADDRESS IS REQUIRED"]
        },
        registrationdate:
        {
            type:Date,
            default: Date.now
        },
        profileImageUrl:String,
        cart:
        {
            type:Array,
            default:[]
        },
        orders:
        {
            type:Array,
            default:[]
        }
    }
)

// create seller schema
const sellerSchema = new mongoose.Schema(
    {
        userType:String,
        username:
        {
            type:String,
            required:[true,"USERNAME IS REQUIRED"],
            minLength:[4,"Minimum Length should be greater than 4"],
            maxLength:[10,"Maximum Length should be less than 10"],
        },
        password:
        {
            type:String,
            required:[true,"PASSWORD IS REQUIRED"],
            minLength:[4,"Minimum Length should be greater than 4"],
        },
        email:
        {
            type:String,
            required:[true,"EMAIL IS REQUIRED"]
        },
        registration_date:
        {
            type:Date,
            default: Date.now
        },
        profileImageUrl:String,
        company:
        {
            type:String,
            required:[true,"COMPANY NAME IS REQUIRED"]
        }
    }
)

// CREATE PRODUCT SCHEMA
const productSchema = new mongoose.Schema(
    {
        sellerusername:String,    
        productname:
        {
            type:String,
            required:[true,"PRODUCT NAME IS REQUIRED"]
        },
        productid:
        {
            type:Number,
            required:[true,"PRODUCT ID IS REQUIRED"]
        },
        productimage:
        {
            type:String,
            required:[true,"PRODUCT IMAGE IS REQUIRED"]
        },
        productdescription:
        {
            type:String,
            required:[true,"PRODUCT DESCRIPTION IS REQUIRED"]
        },
        productprice:
        {
            type:Number,
            required:[true,"PRODUCT PRICE IS REQUIRED"]
        }
    }
) 

// CREATE Model (class) for userSchema
const User = mongoose.model('user',userSchema)
// CREATE Model (class) for sellerSchema
const Seller = mongoose.model('seller',sellerSchema)
// CREATE PRODUCT (CLASS) for productSchema
const Product = mongoose.model('product',productSchema)


// EXPORT USER,SELLER MODEL
module.exports={User,Seller,Product};
