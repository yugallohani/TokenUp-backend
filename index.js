// // index.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();  // Load environment variables from .env file

// const app = express();

// // Enable CORS for all origins
// app.use(cors());

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // MongoDB connection URI from .env file
// const mongoUri = process.env.MONGO_URI;  // Mongo URI from environment variables
// const port = process.env.PORT || 6679;   // Port from environment variable or default to 6679

// // Connect to MongoDB
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('DB Connection Error: ', err));

// // Define a simple schema and model for the User
// const User = mongoose.model('User', new mongoose.Schema({
//   name: String,
//   email: String
// }));

// // Simple test route to check if the server is working
// app.get('/test', (req, res) => {
//   res.send('Hello, TokenUp backend is working!');
// });

// // Route to fetch all users from MongoDB
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();  // Fetch all users from the database
//     res.json(users);  // Send the users data as a JSON response
//   } catch (err) {
//     res.status(500).send('Error fetching users: ' + err);  // Handle errors
//   }
// });

// // Route to create a new user (POST method)
// app.post('/api/users', async (req, res) => {
//   try {
//     const { name, email } = req.body;  // Extract name and email from the request body
//     const newUser = new User({ name, email });  // Create a new User document
//     await newUser.save();  // Save the new user to the database
//     res.status(201).json(newUser);  // Return the created user as a response
//   } catch (err) {
//     res.status(500).send('Error creating user: ' + err);  // Handle errors
//   }
// });

// // Route to update a user's email (PUT method)
// app.put('/api/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;  // Get the user ID from URL parameters
//     const { email } = req.body;  // Get the new email from request body
//     const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true });  // Update user
//     if (!updatedUser) {
//       return res.status(404).send('User not found');
//     }
//     res.json(updatedUser);  // Return the updated user
//   } catch (err) {
//     res.status(500).send('Error updating user: ' + err);  // Handle errors
//   }
// });

// // Route to delete a user (DELETE method)
// app.delete('/api/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;  // Get user ID from URL
//     const deletedUser = await User.findByIdAndDelete(id);  // Delete the user by ID
//     if (!deletedUser) {
//       return res.status(404).send('User not found');
//     }
//     res.status(200).send('User deleted');
//   } catch (err) {
//     res.status(500).send('Error deleting user: ' + err);  // Handle errors
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming JSON requests

// Import the userController to handle routes
const userController = require('./controllers/userController');

// Test route to check if the server is running
app.get('/', (req, res) => {
  res.send('API is working');
});

// Route for fetching all users (Step 2: Verify the Route Definition)
app.get('/api/users', userController.getAllUsers);  // Make sure this route is correct

// Route for creating a new user
app.post('/api/users', userController.createUser);

// Route for updating an existing user by ID
app.put('/api/users/:id', userController.updateUser);

// Route for deleting a user by ID
app.delete('/api/users/:id', userController.deleteUser);

// Database connection (Step 3: Verify MongoDB URI and DB connection)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('DB Connection Error: ', err));

// Server setup
const port = process.env.PORT || 6679;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});