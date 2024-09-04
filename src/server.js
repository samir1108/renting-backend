    import dotenv from 'dotenv';
    import connectDB from './DB/index.js';
    import app from './app.js';

    import registration from "./routes/registration.js"
    import login from "./routes/login.js"
    dotenv.config({ path: './env' });

    // Define a health check route
    // app.get('/api/users/register', (req, res) => {
    //     console.log('hit')
    //     res.status(200).json({ message: 'Server is up and running!' });
    // });
    app.use('/api/users', registration);
    app.use('/api/users', login);

    connectDB().then(() => {
        app.listen(process.env.port, () => {
            console.log(`server is running on port ${process.env.port}`);
        });
    }).catch((error) => {
        console.log('MongoDB connection failed', error);
    });
