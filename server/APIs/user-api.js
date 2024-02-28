const express = require('express')

const userApp = express.Router()

// get express.async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler')


// import req handlers from controllers
const {getUsers,getUserbyID,addUser,updateUser,deleteUser,userLogin,getprotected,addProduct,userProducts,sellerProducts,deleteProduct,editProduct,addtocart,cart,deletecartproduct}=require('../Controllers/user-controller')

// import token verification middleware
const verifytoken = require('../Middlewares/verifytoken')
const {upload} = require('../Middlewares/cloudinaryUpload')
// CRUD OPERATIONS

// READ- GET ALL USERS
userApp.get('/users',expressAsyncHandler(getUsers))

// READ- GET USER BY ID
userApp.get('/users/:id',expressAsyncHandler(getUserbyID))

// CREATE - POST USER DATA, USER IN DB
// userApp.post('/users',expressAsyncHandler(addUser))
userApp.post('/users',upload.single('pic'),expressAsyncHandler(addUser))

// UPDATE- PUT USER
userApp.put('/users',expressAsyncHandler(updateUser))

// DELETE - DELETE USER
userApp.delete('/users',expressAsyncHandler(deleteUser))

// LOGIN - USER LOGIN
userApp.post('/login',expressAsyncHandler(userLogin))

// protected route
userApp.get('/protected',verifytoken,expressAsyncHandler(getprotected))

// GET Products
// user request
userApp.get('/products',expressAsyncHandler(userProducts)) 
// seller request
userApp.get('/products',expressAsyncHandler(sellerProducts))
// Create Products
userApp.post('/addproduct',expressAsyncHandler(addProduct))
// DELETE PRODUCT
userApp.delete('/deleteproduct/:itemid',expressAsyncHandler(deleteProduct))
// EDIT PRODUCT DETAILS
userApp.put('/editproduct',expressAsyncHandler(editProduct))
// ADD PRODUCTS TO CART
userApp.post('/addtocart',expressAsyncHandler(addtocart))
// RENDER THE CART
userApp.get('/cart/:username',expressAsyncHandler(cart))
// DELETE A PRODUCT IN THE CART COMPLETELY
userApp.post('/deletecartproduct',expressAsyncHandler(deletecartproduct))

module.exports=userApp;
