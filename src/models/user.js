const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    
    name: { type: String,  
      required: true,
        },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);
