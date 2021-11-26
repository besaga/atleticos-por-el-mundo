const router = require("express").Router();
const Pena = require('../models/pena.model');
const{isLoggedIn, checkRoles} = require ("../middlewares");
const {isADMIN, isOwner} = require("../utils");
const fileUploader = require('../config/cloudinary.config');

router.get('/pena-index', isLoggedIn,(req, res, next) => {

  Pena
  .find({role: 'USER'})
  .populate("owner")
  .then(allPenas => {

    newPenas = [];

    allPenas.forEach((pena, i) => {
      
      const copy = {...pena._doc}
      copy.id = pena._id
      copy.isOwner = isOwner(req.session.currentUser, pena)

      newPenas.push(copy)
      console.log(newPenas)
    })
    
    res.render('pena/pena-index', { newPenas, isADMIN: isADMIN(req.session.currentUser) })
  })
  .catch(err => console.log(err))
})
router.get("/new-pena", isLoggedIn,(req, res, next) => {
  res.render("pena/new-pena");
});

router.post('/new-pena', fileUploader.single('avatar'),isLoggedIn,(req, res, next) => {

  let location = {
    type: 'Point',
    coordinates: [req.body.latitude, req.body.longitude]
  }

  Pena.create({
      img: req.file.path,
      name: req.body.name,
      country: req.body.country,
      city: req.body.city,
      site: req.body.site,
      fundation: req.body.fundation,
      phoneNumber: req.body.phoneNumber,
      location: location,
      owner: req.session.currentUser._id  
  })
      .then(() => res.redirect("/"))
      .catch(err => next(err))


});

router.post('/search', isLoggedIn,(req, res, next) => {
  const {country} = req.body
  Pena
  .find({ country })
  .then(allPenas => {
    res.render('pena/search', { allPenas })
  })
  .catch(err => console.log(err))
  
})

router.post('/delete', checkRoles("ADMIN", "PRESIDENT"),(req, res, next) => {
  const {id} = req.query
	Pena
    .findByIdAndRemove(id)
		.then(() => res.redirect('/'))
		.catch(err => next(err))
});

router.get('/edit/:id', checkRoles("ADMIN", "PRESIDENT"),(req, res, next) => {
  const {id} = req.params

	Pena
    .findById(id)
		.then(pena => res.render('pena/pena-update', pena))
		.catch(err => next(err))
    })

router.post('/edit/:id', checkRoles("ADMIN", "PRESIDENT"), (req, res, next) => {
const {id} = req.params
const {name, country, city, site, fundation, phoneNumber, location} = req.body


	Pena
    .findByIdAndUpdate(id, {name, country, city, site, fundation, phoneNumber, location}, {new: true})
		.then((pena) => {
      res.redirect("/")
    })
		.catch(err => next(err))

})

router.get("/unit", (req, res, next) => {
  res.render("nodemailer/unit")
})

router.get('/:pena_id', (req, res, next) => {

  Pena.findById(req.params.pena_id)
    .then(pena => res.render('pena/pena-details', pena))
    .catch(err => next(err))
})
module.exports = router;
