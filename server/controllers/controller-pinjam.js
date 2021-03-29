const router = require('express').Router()

router.get('/' , (req,res,next) => {
    res.status(200).render('pinjam', {
        user : req.session.user.dataPengguna,
        title : "Data Pinjam"
    })
})

module.exports = router