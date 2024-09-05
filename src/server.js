import dotenv from 'dotenv';
import connectDB from './DB/index.js';
import app from './app.js';
import registration from "./routes/registration.js";
import login from "./routes/login.js";
import pgRoutes from './routes/pgRoutes.js'; // Import the image routes


dotenv.config({ path: './env' });

// Health check route to ensure the server and DB are working

// Define other routes
app.use('/api/users', registration);
app.use('/api/users', login);
app.use('/api', pgRoutes); // Use the image upload routes


connectDB().then(() => {
    app.listen(process.env.port, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('MongoDB connection failed', error);
});
