const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "author", "reader"], default: "reader" },
    profilePicture: { type: String, default: "" },
    bio: { type: String, maxlength: 500,  },
  }
);

module.exports = mongoose.model("User", UserSchema);
