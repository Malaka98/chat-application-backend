const userRepository = require("../repositories/userRepository")
const {generateToken} = require("../middleware/authMiddleware");
const user = require("../models/user")

module.exports = {
    loginService: async (logInDto) => {

        const user = await userRepository.getUserByUsernameAndPassword(logInDto.username, logInDto.password);

        if (user) {
            return generateToken({id: user._id, username: user.username});
        }
        // If the credentials are invalid, return an error
        throw new Error('Invalid username or password');
    },

    addUserService: async (userDto) => {
        const newUser = {...userDto}
        const userList = await userRepository.getAllUsers()

        // Generate the roomId object
        userList.forEach((existingUser) => {
            let roomId = {};
            roomId[newUser.id] = `room-${newUser.id}-${existingUser.id}`;
            existingUser.roomId = {...existingUser.roomId, ...roomId};
        });

        newUser.roomId = {};
        userList.forEach((existingUser) => {
            let roomId = {};
            roomId[existingUser.id] = `room-${newUser.id}-${existingUser.id}`;
            newUser.roomId = {...newUser.roomId, ...roomId};
        });

        const userModel = new user({...newUser})
        await userRepository.addUser(userModel)
        await userRepository.updateUserList(userList)
        return newUser
    },

    findUserByIdService: async (id) => {
        return await userRepository.findUserById(id)
    },

    findUserByUsernameService: async (username) => {
        return await userRepository.findUserByUsername(username)
    }
}
