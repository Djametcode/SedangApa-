const User = require("../model/user");
const Chat = require("../model/chat");
const Post = require("../model/post");

const addFriend = async (req, res) => {
  const { Id } = req.params;
  const username = req.body;
  try {
    const user = await User.findById(Id);
    user.friends.push(username);
    await user.save();

    return res.status(200).json({ msg: "Success add friend", user });
  } catch (error) {
    console.log(error);
  }
};

const newChat = async (req, res) => {
  const { username2 } = req.body;
  const participants = [
    {
      username1: req.user.userId,
      username2: username2,
    },
  ];
  const createdBy = req.user.userId;
  const message = [];
  const newChat = new Chat({
    participants,
    createdBy,
    message,
  });

  try {
    await participants.push(createdBy);
    const savedChat = await newChat.save();
    return res.status(200).json({ msg: "Berhasil memulai chat", savedChat });
  } catch (error) {
    console.log(error);
  }
};

const getMyChat = async (req, res) => {
  try {
    const chat = await Chat.find({ createdBy: req.user.userId })
      .populate("createdBy")
      .populate("participants.username1")
      .populate("message.sender");
    return res.status(200).json({ chat });
  } catch (error) {
    console.log(error);
  }
};

const sendChat = async (req, res) => {
  const { Id } = req.params;
  const { text } = req.body;
  const sender = req.user.userId;

  try {
    const newMessage = {
      text,
      sender,
    };

    const chat = await Chat.findById(Id);

    if (!chat) {
      return res.status(404).json({ msg: "Chat tidak ditemukan" });
    }

    chat.message.push(newMessage);
    await chat.save();

    return res.status(200).json({ msg: "Berhasil chatting", chat });
  } catch (error) {
    console.log(error);
  }
};

const deleteChat = async (req, res) => {
  try {
    const { Id } = req.params;
    const chat = await Chat.findByIdAndDelete(Id);
    return res.status(200).json({ msg: "Berhasil hapus chat", chat });
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  const Id = req.user.userId;
  const { text } = req.body;
  const createdBy = req.user.userId;

  const newPost = new Post({
    text,
    createdBy,
  });

  try {
    const post = await Post.create(newPost);
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak di temukan" });
    }
    user.post.push(post);
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const getMyPost = async (req, res) => {
  const user = req.user.userId;
  try {
    const post = await Post.find({ createdBy: user }).populate("createdBy");
    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const { Id } = req.params;
  try {
    const post = await Post.findOneAndDelete({ _id: Id });
    if (!post) {
      return res.status(404).json({ msg: "Post not found maybe deleted?" });
    }
    return res.status(200).json({ msg: "Post deleted", post });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const { Id } = req.params;
  try {
    const user = await User.findOne({ _id: Id });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFriend,
  newChat,
  getMyChat,
  sendChat,
  deleteChat,
  createPost,
  deletePost,
  getMyPost,
  getUserById,
};
