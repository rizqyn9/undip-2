const router = require('express').Router()
const Inaktif = require('../models/model-dataInaktif')

router.get('/:id',async (req,res,next) => {
    try {
        const data = await Inaktif.findById(req.params.id)
        // console.log(data);
        res.render('edit',{
            user : req.session.user.dataPengguna,
            title : "Edit Data",
            data : data,
            path : 'arsip'
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/:id', async (req,res,next) => {
    console.log("oka");

    try {
        const update = await Inaktif.findByIdAndUpdate(req.params.id,{
            ...req.body,
            TingkatPerkembangan : {
                Data1 : req.body.Data1,
                Data2 : req.body.Data2,
                Data3 : req.body.Data3
            }
        }).then(data => {
            if(!data) {
                console.log("Gagal Update");
                res.status(401).redirect('/data')
            } else {
                console.log("Berhasil Update");
                res.status(201).redirect('/data')
            }
        }).catch( err => {
            console.log(err);
            res.status(401).redirect('/data')
        })
    } catch (error) {
        console.log(error);
        res.status(401).redirect('/data')
    }
})

module.exports = router