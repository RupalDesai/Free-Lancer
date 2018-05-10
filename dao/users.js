const mongoCollections = require("../config/mongodb-collection");
const users = mongoCollections.users;

let exportedMethods = {
  async getuser(id) {
    if (!id) throw "You must provide an id to search for";

    const usersCollection = await users();
    const user = await usersCollection.findOne({ _id: id });
    if (user === null) throw "No todo with that id";

    return user;
  },            
 
      async getAllUsers() {
        const usersCollection = await users();
    
        const user = await usersCollection.find({}).toArray();
    
        return user;
      },

async createuser(usernameInput,emailInput,phoneInput,passwordInput,confirmpwdInput,aoiInput) {

    const uuidV4 = require('uuid/v4');
    let randomID = uuidV4();
    const usersCollection = await users();

    let newTask = {
        _id: randomID,
        user_name:usernameInput ,
        email_id: emailInput,
        phone_no:phoneInput,
        password :passwordInput,
        cpassword:confirmpwdInput,
        AOI:aoiInput
    };

    const insertInfo = await usersCollection.insertOne(newTask);
    if (insertInfo.insertedCount === 0) throw "Could not add user";

    const newId = insertInfo.insertedId;

    const task = await this.getuser(newId);
    return task;
  }



};
module.exports = exportedMethods;