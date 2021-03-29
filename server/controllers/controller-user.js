const router = require('express').Router()
const User = require('../models/model-user')

router.get('/' , async(req,res,next) => {
    const data = await User.findById(req.session.user.dataPengguna._id)
    res.render('user',{
        user : data,
        title : "User Setting",
    })
})

router.post('/' , async(req,res,next) => {
    // console.log(req.body);
    try {
        let updateUser = await User.findByIdAndUpdate(req.body.id,{
            ...req.body,
        })
        updateUser.Password = await updateUser.encryptPassword(req.body.Password)
        // console.log(updateUser);
        updateUser.save((err, data) => {
            if(err) {
                console.log(err);
                res.status(401).redirect('/user')
            } else {
                console.log(data);
                let dataPengguna = {
                    ...data,
                    Password:null
                }
                req.session.user = {
                    dataPengguna : dataPengguna 
                }
                res.status(201).redirect('/user')
            }
        })
        // .then(data => {
        //     if(!data) {
        //         console.log("Gagal Update");
        //         res.status(401).redirect('/user')
        //     } else {
        //         console.log("Berhasil Update");
        //         res.status(201).redirect('/user')
        //     }
        // }).catch( err => {
        //     console.log(err);
        //     res.status(401).redirect('/user')
        // })
    } catch (error) {
        console.log(error);
        res.status(501).redirect('/user')
    }
})

module.exports = router