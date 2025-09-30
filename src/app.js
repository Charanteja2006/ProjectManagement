import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// basic configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || "https://localhost:8000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']    
})
);

// import the routes
import healthcheckRoutes from './routes/healthcheck.routes.js';
import authRouter from './routes/auth.routes.js';


app.use('/api/v1/healthcheck', healthcheckRoutes);
app.use('/api/v1/auth', authRouter);

export default app;