

const express = require('express');
const usersController = require('../Controller/UserController');
const router = express.Router();


router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser); // Update user by ID
router.delete("/:id", usersController.deleteUser); // Delete user by ID
// Add the login route
router.post("/login", usersController.login); // Login route
module.exports = router;