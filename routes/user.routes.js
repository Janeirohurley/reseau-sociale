const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userControllers = require("../controllers/user.controller");
router.post("/register", authController.signUp);
router.post("/login", authController.signin);
router.get("/logout", authController.logout);

router.get("/", userControllers.getAllUsers);

router.get("/:id", userControllers.userInfo);

router.put("/:id", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

router.patch("/follow/:id", userControllers.follow);

router.patch("/unfollow/:id", userControllers.unfollow);

module.exports = router;
