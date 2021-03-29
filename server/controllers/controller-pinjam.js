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

router.post('/:id', async(req,res,next) => {
    // console.log(req.body);
    try {
        let data = await Inaktif.findByIdAndUpdate(req.params.id,{
            Pinjam : true,
            DataPinjam : {
                Nama : req.body.NamaPinjam,
                NIP : req.body.NIP
            }
        }).then(data => {
            if(!data) {
                console.log("Gagal Update");
                res.status(401).redirect('/pinjam')
            } else {
                console.log("Berhasil Update");
                res.status(201).redirect('/pinjam')
            }
        }).catch( err => {
            console.log(err);
            res.status(401).redirect('/pinjam')
        })
    } catch (error) {
        console.log(error);
    }
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
    res.render('pinjam', {
        user : req.session.user.dataPengguna,
        title : "Data Pinjam",
        data : dataPinjam,
        path : 'pinjam',
        pinjam : true
    })
})

module.exports = router