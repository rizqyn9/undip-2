const router = require('express').Router()
const Inaktif = require('../models/model-dataInaktif')
const moment = require('moment')

moment.locale('id')


router.get('/',async (req,res,next) => {
    const data = await Inaktif.find().sort({Created_At : -1})
    // const dummy = data.map(el => {
    //     console.log(el);
    //     let arrayData = []
    //     for(let i = 0;  i < 3 ; i++) {
    //         arrayData.push(el)
    //     }
    //     return arrayData
    // })

    // console.log( data);
    // console.log(req.session);
    res.status(200).render('data',{
        user : req.session.user.dataPengguna,
        title : "Data Inaktif",
        data : data,
        path : 'arsip'
    })
})

// Tambah Data Barus
router.get('/baru',(req,res,next) => {
    res.status(200).render('input', {
        user : req.session.user.dataPengguna,
        title : "Input Data",
        path: 'arsip'
    })
})

router.post('/baru',async (req,res,next) => {
    console.log(req.body);
    try {
        const inaktif = new Inaktif({
            ...req.body,
            TingkatPerkembangan : {
                Data1 : req.body.Data1,
                Data2 : req.body.Data2,
                Data3 : req.body.Data3
            },
        })
        await inaktif.save((err, data) => {
            if(err){
                console.log(err);
                res.status(401).redirect('/data')
            } else {
                console.log("Input data baru");
                res.status(201).redirect('/data')
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).redirect('/data')
    }
})


//  Pagination 
router.get('/:views/:pages/:search', async (req,res,next) => {
    const {views, pages, search} = req.params
    const viewsInt = await parseInt(views)
    const pageInt = await  parseInt(pages)
    
    try {
        var allData = await Inaktif.find()
                                .skip((viewsInt * pageInt) - viewsInt)
                                .limit(viewsInt)
                                // console.log(allData);
        res.send(allData).status(200)
    } catch (error) {
        res.status(401)
    }
})

router.get('/permanen', async(req,res,next) => {
    try {
        const dataPermanen = await Inaktif.find({Keterangan : "Permanen"})
        res.render('data', {
            user : req.session.user.dataPengguna,
            title : "Data Permanen",
            data : dataPermanen,
            path : 'permanen'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/musnah', async(req,res,next) => {
    try {
        const dataMusnah = await Inaktif.find({Keterangan: "Musnah"})
        res.render('data', {
            user : req.session.user.dataPengguna,
            title : "Data Musnah",
            data : dataMusnah,
            path : 'musnah'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/ditinjau', async(req,res,next) => {
    try {
        const dataDitinjau = await Inaktif.find({Keterangan : "Ditinjau Kembali"})
        res.render('data', {
            user : req.session.user.dataPengguna,
            title : "Data Ditinjau",
            data : dataDitinjau,
            path : 'ditinjau'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/hapus/:id", async (req,res,next) => {
    try {
        await Inaktif.findByIdAndDelete(req.params.id)
                    .then(data => {
                        if (!data){
                            res.status(401).redirect('/data')
                        } else {
                            console.log("Deleted data");
                            res.status(201).redirect('/data')
                        }
                    })
        } catch (error) {
            console.log(error);
            res.status(401).redirect('/data')
    }
})

module.exports = router