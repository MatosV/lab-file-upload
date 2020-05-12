const express = require('express');

//IMG
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
//END IMG

const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');

//UPLOAD IMG => CONECTED WITH .ENV
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'lad-file-upload'
});

const uploader = multer({ storage });
// const uploader = multer({ dest: 'tmp' }); // Storing locally in tmp folder

const postRouter = new express.Router();

postRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

postRouter.post('/create', routeGuard, uploader.single('picture'), (req, res, next) => {
  const content = req.body.content;
  const images = req.file.url;
  // const userId = req.session.userId;
  const userId = req.user._id;
  Post.create({
    content,
    images,
    creatorID: userId
  })
    .then(post => {
      res.redirect('/post/new');
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/new', (req, res, next) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      res.render('post/new', { posts });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
