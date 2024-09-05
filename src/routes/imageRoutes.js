import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Image from '../models/ImageModel.js'; // Ensure you have this model or replace with your actual model

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Single image upload
router.post('/upload-single', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert buffer to stream and upload to Cloudinary
        cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }

            // Save image URL to MongoDB
            const newImage = new Image({ url: result.secure_url });
            await newImage.save();

            res.status(200).json({ message: 'Image uploaded successfully!', url: result.secure_url });
        }).end(req.file.buffer);  // Use .end() to pass the buffer

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
