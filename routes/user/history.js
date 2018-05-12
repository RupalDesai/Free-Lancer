/* importing required files and packages */
const express = require('express');
const router = express.Router();
const userData = require('../../dao').users;
const historyData = require('../../dao').history;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
    } else {
		res.redirect('/user/login');
    }
}

router.get('/workspaces/', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
	try {
        const workspaceHistoryList = await historyData.getWorkspaceHistoryByEmail(email);
		res.render('history/workspace-history', {
            workspacesList: workspaceHistoryList
        });
	} catch(err) {
		throw err;
	}
});

router.post('/workspaces', /*isLoggedIn,*/ async (req, res) => {
	let email = 'pgarg2@stevens.edu' //req.user.email;
    
    let wName = req.body.name;
    let wEmail = req.body.email;
    let wPhone = req.body.phone;
    let wAddress = req.body.address;

    try {
        const workspaceHistoryList = await historyData.addNewReview(email, wName, wEmail, wPhone, wAddress);
        res.redirect('/user/history/jobs');
    } catch(err) {
        throw err;
    }
});

// exporting routing apis
module.exports = router;