import express from 'express';
import bcrypt from 'bcrypt';
import signup from '../models/Signup.models.js';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { contactNumber, password } = req.body;
     

        // Check if the user exists using the contact number
        const user = await signup.findOne({ contactNumber });
    
        
        // If user not found, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid contact number or password' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid contact number or password' });
        }

        // If valid, respond with a success message or a token
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
