/* 
 * Info Routers * 
 * Info Data Access Object *
 * Info Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;
const jobFilter = require('../../dao').jobFilter;

router.get('/', async (req, res) => {
    const companyList = await companies.getCompanies();
    res.render("static/job", { 
        title: "Job Page",
        company:companyList
        });
    });


router.post("/", async (req, res) => {   
    let techArray = req.body.inputTech;

    try {
        const companyList = await companies.getCompanies();
        const resultData = await jobFilter.applyFilter(companyList,techArray);
        res.status(200).send({ data: resultData });
    } catch(err) {
        throw err;
    }
});
    // exporting routing apis
    module.exports = router;



