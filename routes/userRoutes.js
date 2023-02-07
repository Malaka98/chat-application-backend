const userController = require("../controllers/userController")
const {verify} = require("../middleware/authMiddleware")

module.exports = (router) => {
    router.post("/login", userController.logIn)
    router.post("/", userController.addUser)
    router.get("/id/:userId", verify, userController.getUserById)
    router.get("/username/:username", verify, userController.getUserByUsername)
    router.get("/verify", verify, userController.verifyUser)

    return router;
}
