//content - Text belonging to the post
//creatorId - ObjectId of the post's creator
//pictureUrl - Where the picture is stored
//pictureName - The picture's name

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    images:{
        type: String
      }  
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateDate"
    }
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;