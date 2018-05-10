const express = require('express');
const router = express.Router();
const users = require("../../dao").users;
const connection = require("../../config/mongodb-connection");
// const session = require('express-session');
// const user = require('../../dao').users;

router.get("/",async(req,res)=>{
    res.render("signup/form", {});
});

router.post("/signup",async(req,res)=>
{
    // const main = async () => {
    let input=req.body;
    let usernameInput=input["username"];
    let emailInput=input["email_id"];
    let phoneInput=input["phone"];
    let passwordInput=input["password"];
    let confirmpwdInput=input["cpassword"];
    let aoiInput=input["aoi"];

    const createduser= await users.createuser(usernameInput,emailInput,phoneInput,passwordInput,confirmpwdInput,aoiInput);
    // const removeTask = await todoItems.removeTask(createdTask1._id);
    const getusers = await users.getAllUsers();
    console.log("\nAll task");
    
    console.log(getusers);
    res.render("signup/confirm", { 
        title: "Registered successfully!"
        });
            }
        
        );




module.exports = router;