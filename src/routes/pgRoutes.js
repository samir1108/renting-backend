import express from 'express';
import multer from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';
import PGListing from '../models/PgListing.models.js';

const router = express.Router();

// POST route to upload images and create a new PG listing
router.post('/uploadSpace', multer.array('images'), async (req, res) => {
    console.log("reached here on  post ");
    
    try {
        const { pgName, address, monthlyCharge, electricity, securityDeposit, pgType, verified, filterAddressType, contactNumber } = req.body;
        let imageUrls = [];

        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
        }

        const newListing = new PGListing({
            pgName,
            address,
            monthlyCharge,
            electricity,
            securityDeposit,
            pgType,
            verified: verified === 'true', // Convert to boolean
            filterAddressType,
            contactNumber: JSON.parse(contactNumber), // Parse contactNumber as an array
            images: imageUrls,
        });

        await newListing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET route to retrieve all PG listings
router.get('/listings', async (req, res) => {
    console.log("reached here  get");
    try {
        const listings = await PGListing.find();
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
