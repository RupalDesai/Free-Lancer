/* importing required files and packages */
const express = require('express');
const usersRoutes = express.Router();

/* payment route */
usersRoutes.use("/signup", require('./signup')); // url: ~/user/signup

/* non existing page configuration */
usersRoutes.use("*", (req, res) => {
	res.render('components/errors', {
		mainTitle: "Page Not Found •",
		code: 404,
		message: `Page Not Found`,
//		user: req.user
	});
});

module.exports = usersRoutes;