
/* importing required files and packages */
const express = require('express');
const router = express.Router();
const companies = require('../../dao').companies;
//let companydetails = [];

router.get('/:id', async (req, res) => {
    var jobID = req.params.id;
    var projectList = [];
    var projectDetails = [];
    var companyClicked = '';
    const companyList = await companies.getCompanies();
    console.log("now you clicked on job details \n");
    //console.log(companyList);
    console.log("job id is "+jobID);

    

    /*for(let x in companyList){
        //console.log(" project is"+ companyList[x]["projects"]);
        //projectList += companyList[x]["projects"];
    for(let y in companyList[x]["projects"]) {
        console.log("id is ",projects[y][_id]);
        /*if(jobID == companyList[y]["projects"]){

            console.log("Fetched data --> ", jobID);
            // projectDetails = projectList[y];
            
        }
    }
    }*/
    
    //companyClicked = companyList[x]["name"];
    console.log("projectList is ",projectList);
    console.log("projectDetails is ",projectDetails);
    console.log("company name is ",companyClicked);
        
      res.render("details/jobDetails", { 
        Company : companyClicked,
        Project : projectDetails
        
        });
    });

    // exporting routing apis
    module.exports = router;



