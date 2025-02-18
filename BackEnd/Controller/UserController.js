const User = require("../Model/User");

// Get all users
const getUsers = async (req, res) => {
    try {
        console.log("running code here ");
        const users = await User.find({}, "-password");
        console.log(users);

        res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
    } catch (err) {
        res.status(500).json({ message: "Fetching users failed, please try again later." });
    }
};

// Insert a new user
const createUser = async (req, res) => {
    const { username, email, password, role, profilePicture, bio } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password, // Note: Hash the password before saving in a real application
            role,
            profilePicture,
            bio,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ user: newUser.toObject({ getters: true }) });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Creating user failed, please try again later." });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role, profilePicture, bio } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role, profilePicture, bio },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ user: updatedUser.toObject({ getters: true }) });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Updating user failed, please try again later." });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Deleting user failed, please try again later." });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
