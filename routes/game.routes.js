const router = require("express").Router();
const Game = require('../models/Game.model');


router.get('/game-index', (req, res, next) => {

    Game
    .find()
    .then(allGame => {
      res.render('game/game-index', { allGame })
    })
    .catch(err => console.log(err))
  })

  module.exports = router;