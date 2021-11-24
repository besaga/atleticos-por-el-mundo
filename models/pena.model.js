const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penaSchema = new Schema(
  {
    img: String,
    name: String,
    country: String,
    city: String,
    site: String,
    fundation: Number,
    phoneNumber: String,
    owner: {
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    location: {
      type: {
        type: String,
        default:"Point",
      },
      coordinates: [Number],
    },
    imgTourist: [String]
  },
  {
    timestamps: true
  }
);

const Pena = mongoose.model('Pena', penaSchema);

module.exports = Pena;