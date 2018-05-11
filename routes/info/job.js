/* 
 * Info Routers * 
 * Info Data Access Object *
 * Info Items *
*/

/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;


router.get('/', async (req, res) => {

    const companyList = await companies.getCompanies();
    console.log("now you clicked on jobs \n");
    //console.log(companyList);
    
      res.render("static/job", { 
        title: "Job Page!!",
        company:companyList
        });
    });

    // exporting routing apis
    module.exports = router;



