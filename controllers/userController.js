// // userController.js

// const User = require('../models/UserModel');  // Import the User model

// // Create a new user
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;  // Destructure name and email from request body

//     // Create a new user instance
//     const newUser = new User({ name, email });

//     // Save the user to the database
//     await newUser.save();

//     // Respond with the newly created user
//     res.status(201).json(newUser);
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: 'Error creating user', error: err });
//   }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();  // Fetch all users from the database
//     res.status(200).json(users);  // Send the users as JSON response
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: 'Error fetching users', error: err });
//   }
// };

// // Get a user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;  // Get the user ID from URL parameters

//     const user = await User.findById(id);  // Find user by ID

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);  // Send the user as JSON response
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: 'Error fetching user', error: err });
//   }
// };

// // Update a user by ID
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;  // Get the user ID from URL parameters
//     const { name, email } = req.body;  // Get updated name and email from request body

//     const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(updatedUser);  // Send the updated user as JSON response
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: 'Error updating user', error: err });
//   }
// };

// // Delete a user by ID
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;  // Get the user ID from URL parameters

//     const deletedUser = await User.findByIdAndDelete(id);  // Delete user by ID

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User deleted successfully' });  // Confirm deletion
//   } catch (err) {
//     // Handle errors
//     res.status(500).json({ message: 'Error deleting user', error: err });
//   }
// };

// Import the User model to interact with the users collection
const User = require('../models/UserModel');  // Ensure the correct path to your model

// Get all users (Step 3: Verify Controller Logic)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);  // Send the users as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;  // Extract data from the request body
  try {
    const newUser = new User({ name, email });
    await newUser.save();  // Save the new user to the database
    res.status(201).json(newUser);  // Respond with the newly created user
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Update an existing user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the route parameters
  const { name, email } = req.body;  // Extract the new name and email from the request body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );  // Update the user in the database and return the updated user
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);  // Respond with the updated user
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;  // Get the user ID from the route parameters
  try {
    const deletedUser = await User.findByIdAndDelete(id);  // Delete the user by ID
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });  // Respond with a success message
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};