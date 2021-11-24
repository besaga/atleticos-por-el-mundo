const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    name: String,
    password: {type:String, unique: true, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'PRESIDENT', 'USER'],
      default: 'USER',
    },
    pena: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;