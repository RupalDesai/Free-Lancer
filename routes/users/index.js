const signupRoutes = require('./');

/* importing required files and packages */
const express = require('express');
const usersRouters = express.Router();

/* payment route */
usersRouters.use("/signup", require('./signup')); // url: ~/info/about-us

/* non existing page configuration */
usersRouters.use("*", (req, res) => {
	res.render('components/errors', {
		mainTitle: "Page Not Found •",
		code: 404,
		message: `Page Not Found`,
//		user: req.user
	});
});

module.exports = usersRouters;


// const usersRoutes = require("./signup");

// const  usersMethod = (app) => {
//     app.use("/", usersRoutes);

//     app.use("*", (req, res) => {
//         res.status(404).json({ error: 404 });
//     });
// };

// module.exports = usersMethod;
