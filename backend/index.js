import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'https://ecommerce-web-app-in-mern.onrender.com',
    credentials: true,
}));

app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true, // ⚠️ Enable this if you're using HTTPS
        sameSite: 'none', // ✅ Important for cross-origin cookies
    },
}));

const MONGODB_URL = process.env.MONGO_URL;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is Connnected To Port ${PORT}`);
});

app.use("/api/product", route);
