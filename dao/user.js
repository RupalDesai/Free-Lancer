/* Users Collection
 * Data Access Object *
 * Users Controllers for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoDbCollections = require('../config/mongodb-collection');
const user = mongoDbCollections.users;
const credential = require('./credentials');

/* exporting controllers apis */
module.exports = userControllers = {
    /**
     * @returns {Object} An object of workspace
     */
    getUserById: async function(email) {
        if (!email) throw "Please provide the email id";
        
        const userCollection = await user();
        const userInfo = await userCollection.findOne({ email: email });
        if (userInfo === null) {
            throw "Server issue in fetching user by email id";
        }
        return userInfo;
    },

    /**
     * 
     */
    createUser: async function(username, email, password) {
        if(!username || !email || !password) throw "Insufficient data provided";

        let userInfo = {
            id: uuid.v4(), 
            username: username,
            email: email
        };

        const userCollection = await user();
        const isUserExists = await userCollection.findOne({ email: email });
        if (isUserExists == null) {
            const isUserCreated = await userCollection.insert({ userInfo });
            if (isUserCreated.length === 0) {
                throw "Server issue while creating user.";
            } else {
                const isCredentialCreated = await credential.createCredential(email, password);
                let user = {
                    email: email,
                    password: password
                }
                passport.authenticate('user')(req, res, function() {
                    res.json({ success: true });
                });
            }
        } else {
            throw "User already exists.";
        }
    }
};