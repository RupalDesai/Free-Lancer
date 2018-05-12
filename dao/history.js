/* Workspace Collection
 * Data Access Object *
 * Workspace History Controllers for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const mongoDbCollections = require('../config/mongodb-collection');
const history = mongoDbCollections.history;

/* exporting controllers apis */
let historyControllers = {
    /**
     * 
     */
    isUserHasHistory: async function (email) {
        if (!email) throw "Please provide an email"; 
        const historyCollection = await history();
        const historyInfo = await historyCollection.findOne({ _id: email });
        if (historyInfo === null) return false;
        return true;
    },

    /**
     * @returns {Object} An object of workspace history collection
     */
    getWorkspaceHistoryByEmail: async function (email) {
        if(!email) throw "Please provide an email";
        
        const historyCollection = await history();
        let historyInfo = await historyCollection.findOne({ _id: email });
        if (historyInfo === null) {
            throw "Server issue in getting workspaces history list with 'history' collection";
        }
        return historyInfo.workspacesList;
    },

     /**
     * 
     */
    addNewWorkspaceHistory: async function(email, wName, wEmail, wPhone, wAddress) {
        if (!email) throw "Please provide user email";
        if (!wName) throw "Please provide workspace name";
        if (!wEmail) throw "Please provide workspace email address";
        if (!wPhone) throw "Please provide workspace phone";
        if (!wAddress) throw "Please provide workspace address";

        try {
            const historyCollection = await history();
            const isUserHistory = await this.isUserHasHistory(email);

            let newHistoryInfo = {
                name: wName,
                email: wEmail,
                phone: wPhone,
                address: wAddress
            };
            if (isUserHistory) {
                const wHistoryInfo = await this.getWorkspaceHistoryByEmail(email);
                if (wHistoryInfo === null || wHistoryInfo === undefined) {
                    const isWorkHistoryCreated = await this.insertWorkspaceHistory(email, newHistoryInfo);
                    if (isWorkHistoryCreated.success !== true) throw "Error in creating workspace history";
                } else {
                    const isWorkHistoryCreated = await this.updateWorkspaceHistory(email, newHistoryInfo);
                    if (isWorkHistoryCreated.success !== true) throw "Error in creating workspace history";
                }
            } else {
                const isWorkHistoryCreated = await this.createWorkspaceHistory(email, newHistoryInfo);
                if (isWorkHistoryCreated.success !== true) throw "Error in creating workspace history";
            }
            return { success: true };
        } catch(err) {
            throw err;
        }
    },

    /**
     * 
     */
    insertWorkspaceHistory: async function(email, newHistoryInfo) {
        if (!email) throw "Please provide user email";
        if (!newHistoryInfo) throw "Please provide workspace details";

        let newInfo = { 
            workspacesList: [
                newHistoryInfo
            ]
        };
        try {
            const historyCollection = await history();
            const isHistoryCreated = await historyCollection.updateOne({ _id: email }, { $set: newInfo });
            return { success: true };
        } catch (err) {
            throw err;
        }
    },

    /**
     * 
     */
    updateWorkspaceHistory: async function(email, newHistoryInfo) {
        if (!email) throw "Please provide user email";
        if (!newHistoryInfo) throw "Please provide workspace details";

        let newInfo = { };
        try {
            const workList = await this.getWorkspaceHistoryByEmail(email);
            newInfo['workspacesList'] = workList.push(newHistoryInfo);

            const historyCollection = await history();
            const isHistoryCreated = await historyCollection.updateOne({ _id: email }, { $set: newInfo });
            return { success: true };
        } catch (err) {
            throw err;
        }
    },

    /**
     * 
     */
    createWorkspaceHistory: async function(email, newHistoryInfo) {
        if (!email) throw "Please provide user email";
        if (!newHistoryInfo) throw "Please provide workspace details";
        let newInfo = { 
            _id: email,
            workspacesList: [ newHistoryInfo ]
        };
        try {
            const historyCollection = await history();
            const isHistoryCreated = await historyCollection.insert(newInfo);
            if (isHistoryCreated.insertedCount === 0) throw "Error in creating workspace history";
            return { success: true };
        } catch(err) {
            throw err;
        }
    },


    /**
     * @returns {Object} An object of job history collection
     */
    getJobHistoryByEmail: async function (email) {
        if(!email) throw "Please provide an email";
        
        const historyCollection = await history();
        let historyInfo = await historyCollection.findOne({ _id: email });
        if (historyInfo === null) {
            throw "Server issue in getting job history list with 'history' collection";
        }
        return historyInfo.jobsList;
    }
};

for(let key in historyControllers) {
    module.exports[key] = historyControllers[key];
}