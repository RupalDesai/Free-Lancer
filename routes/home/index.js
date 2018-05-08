/* 
 * Home Routers * 
 * Home Data Access Object *
 * Home Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const workspaces = require('../../dao').workspaces;
const companies = require('../../dao').companies;
// const productsData = data.products;

/* global scoped function */
//------------------------ route to update user information by id
router.get('/', async (req, res) => {
    try {
        let workspacesList = await workspaces.getTopFourWorkspaces();
        let companiesList = await companies.getTopFourCompanies();
      
        res.render('index', {
            mainTitle: "Welcome to",
            mainDescription: "Welcome to the Free Lancer | A search engine to find a best job and workspace.",
            // user: req.user,
            companies: companiesList,
            workspaces: workspacesList
        });
    } catch (err) {
        console.log("d");
        res.status(404).json({ error: err });
    }
});
// exporting routing apis
module.exports = router;