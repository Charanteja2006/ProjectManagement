import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/database.js';  
import { connect } from 'mongoose';
dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() =>{
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    });
