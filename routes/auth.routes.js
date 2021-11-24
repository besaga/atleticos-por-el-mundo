const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('../models/User.model')


// Signup
router.get('/signup-page', (req, res) => res.render('auth/signup-page'))

router.post('/signup-page', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('auth/signup-page', { errorMessage: 'Usuario ya registrado' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})



// Login
router.get('/login-page', (req, res) => res.render('auth/login-page'))

router.post('/login-page', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login-page', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('auth/login-page', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            req.session.currentUser = user
            console.log('Este es el objeto de sesión:', req.session)
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
  })
  



module.exports = router