/* 
 * User Routers * 
 * User Data Access Object *
 * User Signup *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
const userData = require('../../dao').user;

function isLoggedIn(req, res, next) {
    // let input=req.body;
    // let Userid=input["id"];
    // console.log(input);
	if (req.isAuthenticated()) {
        res.redirect('/user/dashboard');
    } else {
        return next();
    }
}

/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    res.render('user/sign-up', {
        mainTitle: "Create an Account •",
        mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace."
    });
});

router.post('/', async (req, res) => {
    console.log(1);
    

    let newUser = req.body;
    
    console.log(1);
    

    let username = xss(newUser.username);
    let email = services.emailToLowerCase(xss(newUser.email));
    let password = xss(newUser.password);

    console.log(1);
    console.log(newUser);

    // checking null values
    if(!username) {
        res.status(400).send({ message: "Please provide your username." });
    } else if (!email) {
        res.status(400).send({ message: "Please provide your email id." });
    } else if (!password) {
        res.status(400).send({ message: "Please provide your account password." });
    }

    console.log(2);
    
    // validating email syntax
    if (!validator.isEmail(email)) {
        res.status(400).send({ message: "Invalid email id format." });
    }

    console.log(3);
    
    // searching for an existing user
    try {
        const createUserDocument = await userData.createUser(username, email, password);

    console.log(4);
    
    } catch(error) {
        res.status(400).send({ message: error });
    }
});

// exporting routing apis
module.exports = router;