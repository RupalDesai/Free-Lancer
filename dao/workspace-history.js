/* Workspace Collection
 * Data Access Object *
 * Workspace History Controllers for DAO actions *
*/

/* importing required files and packages */
const uuid = require('uuid');
const mongoDbCollections = require('../config/mongodb-collection');
const workspaceHistory = mongoDbCollections.workspaceHistory;

/* exporting controllers apis */
let workspaceHistoryControllers = {
    /**
     * @returns {Object} An object of workspace history collection
     */
    getWorkspaceHistoryByEmail: async function (email) {
        if(!email) throw "Please provide an email";

        const workspaceHistoryCollection = await workspaceHistory();
        let workspacesHistoryList = await workspaceHistoryCollection.findOne({ _id: email });
        if (workspacesHistoryList === null) {
            throw "Server issue in getting workspaces history list with 'workspaceHistory' collection";
        }
        return workspacesHistoryList;
    },

    /**
     * 
     */
    createWorkspaceHistory: async function(email, workspaceDetails) {
        if (!email) throw "Please provide user email";
        if (!workspaceDetails) throw "Please provide workspace details";

        let workspaceHistoryInfo = {
            _id: email,
            workspaceDetails: workspaceDetails
        };

        try {
            const wHistoryCollection = await workspaceHistory();
            const isHistoryCreated = await wHistoryCollection.insertOne(workspaceHistoryInfo);
            if (isHistoryCreated.insertedCount === 0) throw "Issue in creating workspace history";
            return { success: true};
        } catch (err) {
            throw err;
        }
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
            const wHistoryCollection = await workspaceHistory();
            const workspaceHistoryInfo = await this.getWorkspaceHistoryByEmail(email);
            let newWorkspaceHistoryInfo = {
                workspaceName: wName,
                workspaceEmail: wEmail,
                workspacePhone: wPhone,
                workspaceAddress: wAddress
            };

            if (workspaceHistoryInfo._id === null) {
                const isWorkHistoryCreated = await this.createWorkspaceHistory(email, newWorkspaceHistoryInfo);
                if (isWorkHistoryCreated.success !== true) throw "Error in creating workspace history";
            } else {
                const isWorkHistoryCreated = await wHistoryCollection.updateOne({ _id: email }, { $set: newWorkspaceHistoryInfo });
                if (isWorkHistoryCreated.success !== true) throw "Error in adding new workspace history";
            }
            return { success: true };
        } catch(err) {
            throw err;
        }
    }
};

for(let key in workspaceHistoryControllers) {
    module.exports[key] = workspaceHistoryControllers[key];
}