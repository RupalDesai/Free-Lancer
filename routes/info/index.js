/* importing required files and packages */
const express = require('express');
const infoRouters = express.Router();

/* payment route */
infoRouters.use("/about-us", require('./about-us')); // url: ~/info/about-us

/* non existing page configuration */
infoRouters.use("*", (req, res) => {
	res.render('components/errors', {
		mainTitle: "Page Not Found •",
		code: 404,
		message: `Page Not Found`,
//		user: req.user
	});
});

module.exports = infoRouters;