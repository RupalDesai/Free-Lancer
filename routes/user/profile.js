const express = require('express');
const router = express.Router();
const userData = require('../../dao').users;
const xss = require('xss');
const validator = require('validator');
// const express = require('express');
// const router = express.Router();
// const xss = require('xss');
// const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
// const userData = require('../../dao').users;
// const services = require('../../assets/helpers/services');

router.get('/', async  (req, res) => {

        res.render('user/profile');
});
router.post('/', async (req, res) => {
    // console.log("inside router post");
    let input = req.body;

    let name = xss(input.name);
    let email = services.emailToLowerCase(xss(input.email));
    let mobile = xss(input.mobile);
    let interest=xss(input.areaofinterest);
    console.log("inside router post");

    // checking null values
    if(!name) {
        res.status(400).send({ message: "Please provide your username." });
    } else if (!email) {
        res.status(400).send({ message: "Please provide your email id." });
    } else if (!mobile) {
        res.status(400).send({ message: "Please provide your account password." });
    }else if(!interest){
        res.status(400).send({message:"Please provide your area of interest"});
    }
        console.log("1");

    try {
            console.log("2");

        const isUserEdited = await userData.editUserInfo(name, email, mobile, interest);
        if (isUserEdited.success === true) {
            console.log("5");
            res.status(200).send({ message: "Account created successfully" });
        } else {
            res.status(400).send({ message: "Unknow error occurred" });
        }
    } catch(error) {
        res.status(400).send({ message: error });
    }
});

module.exports = router;        
