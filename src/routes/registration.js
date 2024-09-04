import express from 'express';
import bcrypt from 'bcryptjs';
import registration from '../models/Signup.models.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    
    
    const { name, contactNumber, email, password } = req.body;

    try {
    
        
        // Check if contact number already exists
        let userByContact = await registration.findOne({ contactNumber });
        if (userByContact) {
            return res.status(400).json({ message: 'Contact number already in use' });
        }

        // Check if email already exists
        let userByEmail = await registration.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new registration({
            name,
            contactNumber,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
       
        res.status(500).send('Server error');
    }
});

export default router;
