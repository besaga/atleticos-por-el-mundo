const router = require("express").Router();

const transporter = require("../config/nodemailer.config")

router.post('/unit', (req, res, next) => {
  let { email, subject, message } = req.body;

  transporter.sendMail({
    from: '"Pena Mail" <frediybego@gmail.com>',
    to: `${email}`,
    subject: `${subject}`,
    text: `${message}`,
    html: `<b>${message}</b>`
  })
    .then(info => res.redirect('/'))
    .catch(error => {
        console.log(error)
        res.render('nodemailer/message', { errorMessage: "El correo no ha podido ser enviado" })
    })

});


module.exports = router;