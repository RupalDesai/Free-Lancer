/* Workspaces Reviews Collection
 * Data Access Object *
 * Workspaces Reviews Controllers for DAO actions *
*/

/* importing required files and packages */
const mongoDbCollections = require('../config/mongodb-collection');
const workspaceReviews = mongoDbCollections.workspaceReviews;

/* exporting controllers apis */
module.exports = reviewsControllers = {
    /**
     * @returns {Array} List of all reviews on workspace in the database
     */
    getAllReviews: async function () {
        const reviewsCollection = await workspaceReviews();
        const reviewInfo = await reviewsCollection.find({}).toArray();
        if (reviewInfo === null) {
            throw "Server issue in fetching workspace reviews";
        }
        return reviewInfo;
    },

    /**
     * @returns {String} A top review comment
     */
    getReviewById: async function(id) {
        if (!id) throw "Please provide the reviews id";
        const reviewsCollection = await workspaceReviews();
        const reviewInfo = await reviewsCollection.findOne({ _id: id });
        if (reviewInfo === null) {
            throw "Server issue in fetching workspace reviews by id";
        }
        return reviewInfo.userReviews[0].comment;
    }
};