const router = require('express').Router()
const Inaktif = require('../models/model-dataInaktif')

router.get('/', async (req,res) => {
    try {
        const length = await Inaktif.countDocuments()
        console.log(length);
        res.render('dashboard', {
            user : req.session.user.dataPengguna,
            title : "Dashboard",
            path : 'dashboard',
            length : length
    
        })
    } catch (error) {
        // console.log(error);
    }
})

module.exports = router
