const router = require('express').Router()
const Users = require('../models/model-user')
const moment = require('moment')


moment.locale('id')

//  Masuk ke menu autentikasi
router.get('/' , (req,res,next) => {
    res.render('daftar',{
        title : "Masuk SIORI"
    })
})

// Daftar
router.post('/signup', async (req, res,next) => {
    // console.log(req.body);
    try {
        const user = new Users({
            ...req.body,
            Created_Moment : moment().format('LLL')
        })
        user.Password = user.encryptPassword(req.body.Password)
        user.save((err, result) => {
            if(err) {
                console.log(err);
                res.status(401).redirect('/authentication')
            } else {
                res.status(201).redirect('/authentication')
            }
        })
    } catch (error) {
        console.log(error);
        
    }
})

//  Masuk
router.post('/', async (req, res,next) => {
    try {
    // console.log(req.body);

        // console.log(req.body.Password);
        let user = await Users.findOne({Username : req.body.Username}).exec()
        if(!user){
            return res.status(401).redirect('/authentication')
        }
        let cekPass = await user.validPassword(req.body.Password)
        if(!cekPass){
            console.log("Wrong Pass");
            return res.status(401).redirect('/authentication')
        } else {
            let dataPengguna = {
                ...user._doc,
                Password:null
            }
            req.session.user = {
                dataPengguna : dataPengguna 
            }
            res.status(201).redirect('/')
        }
    } catch (error) {
        console.log(error);
        res.status(401).redirect('/authentication')
    }
})


//  Logout
router.get('/keluar', (req,res,next) => {
    console.log("out");
    req.session.destroy((err) => {
        // delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("user_sid");
        res.redirect('/authentication')
    });
})


module.exports = router