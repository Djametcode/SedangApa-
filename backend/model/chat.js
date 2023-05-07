const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: [
    {
      username1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username2: {
        type: String,
        default: "",
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
