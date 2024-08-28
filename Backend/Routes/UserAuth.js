const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema'); 
const { jwtkey } = require('../keys'); 

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    if (password !== user.password) { // Note: In a real application, use hashed password comparison
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role }, // Payload
      jwtkey, // Secret key
      { expiresIn: '10s' } // Options
    );

    // Send a response with the token and role information
    res.json({
      message: `Logged in as ${user.role}`,
      role: user.role,
      token // Include the token in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
