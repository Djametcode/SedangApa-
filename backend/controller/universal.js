const Post = require("../model/post");

const getAllPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate("createdBy").sort("-timestamp");
    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllPost };
