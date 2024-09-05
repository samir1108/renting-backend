    import express from "express";
    import cors from "cors";
    import cookieParser from "cookie-parser";
    import cloudinary from 'cloudinary';

    // Cloudinary configuration
    cloudinary.v2.config({
        cloud_name: process.env.CDN_CLOUD_NAME,
        api_key: process.env.CDN_API_KEY,
        api_secret: process.env.CDN_API_SECRET,
    });

    const app = express();
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }));
    app.use(express.json({ limit: "16kb" }));
    app.use(express.urlencoded({ extended: true, limit: "16kb" }));
    app.use(cookieParser());

    export default app;
