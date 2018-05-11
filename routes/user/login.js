/* 
 * User Routers * 
 * User Data Access Object *
 * User Login *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const xss = require('xss');
const validator = require('validator');
const passport = require('../../config/passport-user');
const services = require('../../assets/helpers/services');
const userData = require('../../dao').users;
const credentialData = require('../../dao').credentials;

function isLoggedIn(req, res, next) {
	// if (req.isAuthenticated()) {
    //     res.redirect('/user/dashboard');
    // } else {
        return next();
    // }
}

async function isValid(req, res, next) {

    let email = xss(services.emailToLowerCase(req.body.email));
    let password = xss(req.body.password);

    if (email.length == 0) {
        res.status(400).send({ message: "No email id provided" });
    } else if (password.length == 0) {
        res.status(400).send({ message : "No password provided" });
    }

    if (!validator.isEmail(email)) {
        res.status(404).send({ message: "Invalid email id format." });
    }

    const userCredentials = await credentialData.getCredentialByEmail(email);
    if (userCredentials === null) { // no user document found
        res.status(404).send({ message: "This email id is not registered" });
    } else { // document found and comparing credentials
        try{
            const isValidUser = await credentialData.compareCredentials(email, password);
    console.log("aa8");
    
            if (isValidUser.success === true) next();
            else res.status(400).send({ message: "Incorrect password!" });
    console.log("aa9");
    
        } catch (error) {
            res.status(400).send({ message: error });
        }
    }
}

/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    // req.flash('loginFlash');
    // if (req.session.flash["error"] === undefined) {
    //     res.render('user/login', { 
    //         mainTitle: "Dashboard Login •",
    //         url: '/user/dashboard',
    //         error: req.session.flash.error 
    //     });
    // } else {
    // res.render('user/login', { 
    //     mainTitle: "Dashboard Login •",
    //     //error: req.session.flash.error.slice(-1)[0] 
    // });
    // }
    
    res.render('user/profile');

    
});

router.post('/', isValid, async (req, res) => {

    console.log('a');

    const user = await userData.getUserById(services.emailToLowerCase(xss(req.body.email)));

    console.log('b');
    
    passport.authenticate('user');

    console.log('c');
    
    res.status(200).send({ message: "User logged in successfully!" });
});

// exporting routing apis
module.exports = router;