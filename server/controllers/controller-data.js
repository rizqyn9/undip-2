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
        data : data
    })
})

// Tambah Data Barus
router.get('/baru',(req,res,next) => {
    res.status(200).render('input', {
        user : req.session.user.dataPengguna,
        title : "Input Data"
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



module.exports = router