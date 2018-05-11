const express = require('express');
const router = express.Router();
const userData = require('../../dao').user;
// const services = require('../../assets/helpers/services');

router.get('/', async  (req, res) => {
    res.render('user/profile', {
        mainTitle: "Edit your profile•"
        
    });
});

module.exports = router;        
// router.get("/",async(req,res)=>{
//     res.render("user/profile");
// });