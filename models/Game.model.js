const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    img: String,
    name: String,
    date: String,
    hour: String,
    stadium: String,
  },
  {
    timestamps: true
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;