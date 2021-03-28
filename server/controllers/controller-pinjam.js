const router = require('express').Router()
const Inaktif = require('../models/model-dataInaktif')

// Tambah Pinjam
router.get('/:id' , async(req,res,next) => {
    await Inaktif.findByIdAndUpdate(req.params.id,{
        Pinjam: true
    }).then(data => {
        if(!data){
            res.status(402).redirect('/pinjam')
        } else {
            res.status(202).redirect('/pinjam')
            
        }
    })
    // console.log(data);
})

//Hapus Pinjam
router.get('/hapus/:id' , async(req,res,next) => {
    await Inaktif.findByIdAndUpdate(req.params.id,{
        Pinjam: false
    }).then(data => {
        if(!data){
            res.status(402).redirect('/pinjam')
        } else {
            res.status(202).redirect('/pinjam')
            
        }
    })
    // console.log(data);
})

router.get('/' , async (req,res,next) => {
    const dataPinjam = await Inaktif.find({Pinjam : true}) 
    res.render('data', {
        user : req.session.user.dataPengguna,
        title : "Data Permanen",
        data : dataPinjam,
        pinjam : true
    })
})

module.exports = router