//DTOs
const LoginDto = require("../dtos/loginDto")
const UserDto = require("../dtos/userDto")

//Services
const userService = require("../services/userService")

module.exports = {
    logIn: async (req, res) => {

        try {
            const loginCredentials = new LoginDto(req.body["username"], req.body["password"])
            const token = await userService.loginService(loginCredentials)
            res.cookie("accessToken", token, {
                httpOnly: true,
                sameSite: 'none',
                path: "/api"
            }).status(200).json({
                token
            })
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },

    addUser: async (req, res) => {
        try {
            const user = new UserDto(req.body["first_name"], req.body["last_name"], req.body["username"],
                req.body["password"], req.body["address"], req.body["email"], req.body["phone_number"])

            const response = await userService.addUserService(user)
            res.status(201).json({
                response
            })
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await userService.findUserByIdService(userId)
            res.status(200).json({
                user
            })
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },

    getUserByUsername: async (req, res) => {
        try {
            const username = req.params.username
            const user = await userService.findUserByUsernameService(username)
            res.status(200).json({
                user
            })
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    },

    verifyUser: async (req, res) => {
        try {
            res.status(200).json({
                message: req.user
            })
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
}
