import * as dotenv from 'dotenv';

// Ładuj zmienne z pliku .env
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    supportedPostCount: 15,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'
};