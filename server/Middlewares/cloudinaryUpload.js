const cloudinary = require('cloudinary').v2;

const multer = require('multer');
require('dotenv').config()

// core module to update and edit file
const fs = require('fs');


// creating uploads folder if not already present
// in 'uploads' folder temporary upload
// image before uploading to cloudinary

if (!fs.existsSync("./uploads"))
{
    fs.mkdirSync("./uploads");
}


cloudinary.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_API_SECRET
    }
)

// multer config
const localstorage = multer.diskStorage(
    {
        destination: function(req,file,cb)
        {
            cb(null,"./uploads");
        },
        filename: function (req,file,cb)
        {
            cb(null,file.originalname);
        }
    }
)

const upload = multer({storage : localstorage});
module.exports={upload,cloudinary};
