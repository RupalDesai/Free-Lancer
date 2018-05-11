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
const credentialData = require('../../dao').credentials;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
        res.redirect('/user/dashboard');
    } else {
        return next();
    }
}

async function isValid(req, res, next) {
    let email = services.emailToLowerCase(xss(req.body.email));
    let password = xss(req.body.password);

    if (email.length == 0) {
        res.status(400).send({ error: "No email id provided" });
    } else if (password.length == 0) {
        res.status(400).send({ error : "No password provided" });
    }

    if (!validator.isEmail(email)) {
        res.status(404).send({ error: "Invalid email id format." });
    }

    const userCredentials = await credentialData.getCredentialByEmail(email);
    if (userCredentials == null) {      // no user document found
        res.status(404).send({ error: "This email id is not registered" });
    } else {    // document found and comparing credentials
        try{
            credentialsData.compareCredential(email, password);
            next();
        } catch (error) {
            res.status(400).send({ error: "Incorrect password!" });
        }
    }
}


/* global scoped function */
router.get('/', isLoggedIn, (req, res) => {
    res.render('user/login', { 
        mainTitle: "Dashboard Login •"
    });
});

router.post('/', isValid, async (req, res) => {
    let user = {    // create 'user' object
    email: services.emailToLowerCase(xss(req.body.email)),
    password: xss(req.body.password)
}

passport.authenticate('user')(req, res, async function () {   //authenticate user
    res.json({ success: true, url: req.url });
});
});

// exporting routing apis
module.exports = router;