// import user model
const {User,Seller,Product}=require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../Middlewares/cloudinaryUpload');
const fs = require('fs');

const getUsers = async(req,res)=>
{
    const users = await User.find() 
    // send response
    res.status(200).send({message:"Users",payload:users})
};

const getUserbyID = async(req,res)=>
{
    res.send({message:"USER BY ID"})
}

const addUser = async(req,res)=>
{
    // create() => Creates a document and save the document in the collection
    // await User.create(req.body)
    // The mapping is completed even before saving of the document
    // res.status(200).send({message:"USER ADDED",payload:user})

    const userdata = JSON.parse(req.body.data)
    // let userCred = req.body.username
    // let userType = req.body.userType;
    console.log(userdata)
    if (userdata.userType==='user')
    {
        let exists = await User.findOne({username:userdata.username})
        if (exists===null)
        {
            // const UserDocument = new User(req.body)
            let hashedpassword = await bcryptjs.hash(userdata.password,5)
            
            userdata.password=hashedpassword;
            // upload file to cloudinary
            let result = await cloudinary.uploader.upload(req.file.path);
            // add cloudinary image url to user
            userdata.profileImageUrl = result.url;
            let user = await User.create(userdata)

            // remove image from local user 
            fs.unlink(req.file.path,err=>
            {
                if(err)
                {
                    throw err
                }
                // console.log("image removed from local folder")
            })

            res.status(201).send({message:"USER CREATED",payload:user})
        }
        else
        {
            res.status(200).send({message:"USER ALREADY EXISTS"})
        }
    }
    else
    {
        let exists = await Seller.findOne({username:userdata.username})
        if (exists===null)
        {
            let hashedpassword = await bcryptjs.hash(userdata.password,5)
            userdata.password=hashedpassword;

            let seller = await Seller.create(userdata)
            res.status(201).send({message:"SELLER CREATED",payload:seller})
        }
        else
        {
            res.status(200).send({message:"SELLER ALREADY EXISTS"})
        }
    }
      // create the user
        // hash the password
        // let hashed = await bcryptjs.hash(UserDocument.password,5)
        // // replace plain password with hashed password
        // user.password=hashed;
        // // save user
        // usersCollection.insertOne(user)
        // //response
        // res.status(201).send({"message":"USER CREATED"})
}

const updateUser = async(req,res)=>
{
    // use findOneAndUpdate
    let user = await User.findOneAndUpdate({username:req.body.username},{...req.body})
    res.status(200).send({message:"USER UPDATED",payload:user})
}

const deleteUser = async(req,res)=>
{
    let user = await User.findOneAndDelete({username:req.body.username})
    res.status(200).send({message:"USER DELETED",payload:user})
}

const userLogin = async(req,res)=>
{
    // get user credentials from user
    let userCred = req.body;
    // check for data in db
    let userType = req.body.userType
    if (userType==='user')
    {
        let userfromDb = await User.findOne({username:userCred.username})
        if (userfromDb===null)
        {
            res.status(200).send({"message":"INVALID USERNAME"})
        }
        else
        {
            // user is found
                // compare passwords
                let result = await bcryptjs.compare(userCred.password,userfromDb.password)
                // if the password comparision returns true
                if (result)
                {
                    let signedToken = jwt.sign({username:userfromDb.username},process.env.SECRET_KEY,{expiresIn:30})
                    // send token to client
                    res.status(200).send({message:"SUCCESSFUL LOGIN",token:signedToken,user:userfromDb})
                }
                // password comparision returns false
                else
                {
                    res.status(200).send({"message":"PASSWORD IS INVALID"})
                }
        }
    }
    else if(userType==='seller')
    {
        let userfromDb = await Seller.findOne({username:userCred.username})
        if (userfromDb===null)
        {
            res.status(200).send({"message":"INVALID USERNAME"})
        }
        else
        {
            // user is found
                // compare passwords
                let result = await bcryptjs.compare(userCred.password,userfromDb.password)
                // if the password comparision returns true
                if (result)
                {
                    let signedToken = jwt.sign({username:userfromDb.username},process.env.SECRET_KEY,{expiresIn:30})
                    // send token to client
                    res.status(200).send({message:"SUCCESSFUL LOGIN",token:signedToken,user:userfromDb})
                }
                // password comparision returns false
                else
                {
                    res.status(200).send({"message":"PASSWORD IS INVALID"})
                }
        }
    }
}


const getprotected=(req,res)=>
{
    res.send({message:"PROTECTED"})
}

// GET PRODUCTS

// USER
const userProducts = async (req,res)=>
{
    let products = await Product.find()
    res.status(200).send({message:"PRODUCTS",payload:products})
}

// SELLER PRODUCTS
const sellerProducts = async(req,res)=>
{
    let products = await Product.find()
    res.status(200).send({message:"PRODUCTS",payload:products})
}

// adding product
const addProduct = async(req,res)=>
{
    // get the req body
    let productdata = req.body
    // get product name to check for duplicates
    // check for duplicates
    let exists = await Product.findOne({productid:productdata.productid})
    // duplicate product exists
    if (exists)
    {
        res.status(200).send({message:"Product already EXISTS"})
    }
    // the duplicate doesn't exist
    else
    {
        // create a product document and add the new product to it according to the schema
        const ProductDocument = new Product(productdata)
        let product = await ProductDocument.save()
        res.status(201).send({message:"PRODUCT HAS BEEN ADDED"})
    }
}

// DELETE PRODUCT
const deleteProduct = async (req,res)=>
{
    let product_id = req.params.itemid
    console.log(product_id)
    let product = await Product.findOneAndDelete({productid:product_id})
    if (product)
    {
        res.status(200).send({message:"PRODUCT DELETED",payload:product})
    }
    else
    {
        res.status(200).send({message:"DELETION FAILED"})
    }
}

// UPDATE OR EDIT PRODUCT
const editProduct = async (req,res)=>
{
    let productdata = req.body
    let updatedproduct = await Product.findOneAndUpdate({productid:productdata.productid},
        {$set:
            {
                productname:productdata.productname,
                productimage:productdata.productimage,
                productdescription:productdata.productdescription,
                productprice:productdata.productprice
            }
        },
        {returnDocument:false})
    if (updatedproduct!==null)
    {
        res.status(200).send({message:"PRODUCT DETAILS HAVE BEEN UPDATED SUCCESSFULLY"})
    }
    else
    {
        res.status(200).send({message:"UPDATE FAILED"})
    }
}

// ADD PRODUCT TO CART
const addtocart = async(req,res)=>
{
    let productdata = req.body
    let addedtocart = await User.findOneAndUpdate({username:productdata.username},
        {
            $push:
            {
                "cart":productdata
            }
        },
        {
            returnOriginal: false
        })
    if (addedtocart)
    {
        res.status(200).send({message:"PRODUCT ADDED TO CART",payload:addedtocart})
    }
    else
    {
        res.status(200).send({message:"PRODUCT COULDN'T ADDED TO CART"})
    }
}

// GET CART PRODUCTS
const cart = async(req,res)=>
{
    let username = req.params.username
    // console.log(req.params)
    // console.log(username)
    let cartproducts = await User.findOne({username:username},{_id:0,cart:1})
    // console.log(cartproducts.cart)
    if (cartproducts!==null)
    {
        res.status(200).send(cartproducts.cart)
    }
    else
    {
        res.status(200).send({message:"ERROR IN GETTING PRODUCTS"})
    }
}

// DELETE CART PRODUCT
const deletecartproduct = async(req,res)=>
{
    let usercartdata = req.body
    // console.log(usercartdata)
    let deletedproduct = await User.findOneAndUpdate({username:usercartdata.username},
        {
            $pull:
            {
                "cart":usercartdata
            }
        },
            {
                returnOriginal: false
            }
    )
    // console.log(deletedproduct)
    if (deletedproduct)
    {
        res.status(200).send({message:"PRODUCT IS DELETED FROM CART",payload:deletedproduct})
    }
    else
    {
        res.status(200).send({message:"FAILED TO DELETE CART ITEM"})
    }
}

module.exports={getUsers,getUserbyID,addUser,updateUser,deleteUser,userLogin,getprotected,addProduct,userProducts,sellerProducts,deleteProduct,editProduct,addtocart,cart,deletecartproduct}
