const router = require('express').Router()
const inaktif = require('../models/model-dataInaktif')
 
router.get('/' , async(req, res,next) => {
    const data = await inaktif.find().limit(120)
    res.render('testtable',{
        user : req.session.user.dataPengguna,
        title : "Surat Inaktif",
        data : data
    })
})


module.exports = router