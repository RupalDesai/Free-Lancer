/* importing required files and packages */
const express = require('express');
const usersRoutes = express.Router();

/* payment route */
usersRoutes.use("/sign-up", require('./sign-up')); // url: ~/user/sign-up
usersRoutes.use("/login", require('./login')); // url: ~/user/login
usersRoutes.use("/forget-password", require('./forget-password')); // url: ~/user//forget-password

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