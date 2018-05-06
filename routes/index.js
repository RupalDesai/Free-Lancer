/* importing required files and packages */
const homeRoutes = require('./home');
//const productsRoutes = require('./products/products-dao');
//const usersRoutes = require('./users');

const mainRoutes = (app) => {

    /* home page routes */
    app.use("/$/", homeRoutes);

    /* customized routes */
    // app.use("/user", usersRoutes);          // user routes

    /* non existing page configuration */
    app.use("*", (req, res) => {
        res.render('alerts/error', {
            mainTitle: "Page Not Found •",
            code: 404,
            message: `Page Not Found`,
            url: req.originalUrl,
            user: req.user
        });
    });
};

module.exports = mainRoutes;