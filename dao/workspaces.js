/* Workspace Collection
 * Data Access Object *
 * Users Controllers for DAO actions *
*/

/* importing required files and packages */
const mongoDbCollection = require('../config/mongodb-collection');
const workspaces = mongoDbCollection.workspaces;

/* exporting controllers apis */
module.exports = workspacesControllers = {
    /**
     * @returns {Array} List of all workspaces in the database
     */
    getWorkspaces: async function () {
        const workspacesCollection = await workspaces();
        let workspacesList = await workspacesCollection.find({}).toArray();
        if (workspacesList.length <= 0) {
            throw "Server issue in getting workspaces list with 'workspaces' collection";
        }
        return workspacesList;
    },

    /**
     * @returns {Array} List of top four workspaces
     */
    getTopFourWorkspaces: async function () {
        try {
            let workspacesList = await this.getWorkspaces();
            let workspaceCount = workspacesList.length;
            
            if (workspaceCount < 0) {
                throw "Server issue in getting workspaces list with 'workspaces' collection";
            } else if (workspaceCount > 4) {
                workspacesList = workspacesList.slice(0, 3);
            } 
            return workspacesList;
        } catch(err) {
            throw err;
        }
    },

    /**
     * @returns {Object} An object of workspace
     */
    getWorkspaceById: async function(id) {
        if (!id) throw "Please provide the workspace id";
        
        const workspacesCollection = await workspaces();
        const workspaceInfo = await workspacesCollection.findOne({ _id: id});
        if (workspaceInfo === null) {
            throw "Server issue in fetching workspace by id";
        }
        return workspaceInfo;
    }
};