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
        const userModel = new user({...userDto})
        return await userRepository.addUser(userModel)
    },

    findUserByIdService: async (id) => {
        return await userRepository.findUserById(id)
    },

    findUserByUsernameService: async (username) => {
        return await userRepository.findUserByUsername(username)
    }
}
