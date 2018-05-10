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
// const passport = require('../../../config/passport-user');
const services = require('../../assets/helpers/services');
const userData = require('../../dao').user;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        res.redirect('/user/dashboard');
    } else {
        return next();
    }
}

/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    res.render('user/signup', {
        mainTitle: "Create an Account •",
        mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace."
    });
});

router.post('/', async (req, res) => {
    let newUser = req.body;
    
    let username = xss(newUser.username);
    let email = services.emailToLowerCase(xss(newUser.email));
    let password = xss(newUser.password);

    // checking null values
    if(!username) {
        res.render('user/signup', { 
            mainTitle: "Create an Account •",
            error: "Please provide your username." 
        });
        return;
    } else if (!email) {
        res.render('user/signup', {
            mainTitle: "Create an Account •",
            error: "Please provide your email id."
        });
        return;
    } else if (!password) {
        res.render('user/signup', {
            mainTitle: "Create an Account •",
            error: "Please provide your account password." 
        });
        return;
    }

    // validating email syntax
    if (!validator.isEmail(email)) {
        res.status(404).send({ error: "Invalid email id format." });
        return;
    }

    // searching for an existing user
    // try{
    //     const userJsonDocument = await userData.getUserById(email);
    //     if(userJsonDocument == null) {
            const createUserDocument = await userData.createUser(username, email, password);
        // } else {
        //     res.status(400).send({ error: "This email id is already registered." });
        // }
    // } catch(error) {
    //     res.render('components/errors', {
    //         mainTitle: "Server Error •",
    //         code: 500,
    //         message: error
    //         // url: req.originalUrl,
    //         // user: req.user
    //     });
    // }
});

// exporting routing apis
module.exports = router;