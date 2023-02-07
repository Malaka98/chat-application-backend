const user = require("../models/user");
module.exports = {
    getUserByUsernameAndPassword: async (username, password) => {
        try {
            return await user.findOne({username: username, password: password})
        } catch (e) {
            console.log("Error" + e.message)
            throw new Error(e.message)
        }
    },

    addUser: async (user) => {
        try {
            return await user.save()
        } catch (e) {
            console.log("Error" + e.message)
            throw new Error(e.message)
        }
    },

    findUserById: async (id) => {
        try {
            return await user.findById(id)
        } catch (e) {
            console.log("Error" + e.message)
            throw new Error(e.message)
        }
    },

    findUserByUsername: async (username) => {
        try {
            return await user.findOne({username: username})
        } catch (e) {
            console.log("Error" + e.message)
            throw new Error(e.message)
        }
    },

    getAllUsers: async () => {
        try {
            return await user.find()
        } catch (e) {
            console.log("Error" + e.message)
            throw new Error(e.message)
        }
    },

    updateUserList: async (userList) => {
        try {
            await Promise.all(userList.map(async item => {
                return user.findOneAndUpdate({id: item.id}, item, {upsert: true});
            }))
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
