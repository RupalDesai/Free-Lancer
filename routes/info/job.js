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
const jobSearch = require('../../dao').jobSearch;

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
       
        console.log(resultData);
        res.status(200).send({ data: resultData });
    } catch(err) {
        throw err;
    }
});

router.post("/job2", async (req, res) => {  
    
    let techArray = req.body.inputTech;
    console.log('1');
    console.log("techArray ",techArray);

    try {
        const companyList = await companies.getCompanies();
        const resultData = await jobSearch.applyFilter(companyList,techArray);
        
       
        console.log("result data is ",resultData);
        res.status(200).send({ data: resultData });
    } catch(err) {
        throw err;
    }
});

    // exporting routing apis
    module.exports = router;



