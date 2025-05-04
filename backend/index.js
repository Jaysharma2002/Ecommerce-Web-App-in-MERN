import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();
const app = express();

app.set('trust proxy', 1); // << IMPORTANT for secure cookies behind a proxy

app.use(cors({
    origin: 'https://ecommerce-web-app-in-mern.onrender.com',
    credentials: true,
}));

app.options("*", cors({
    origin: 'https://ecommerce-web-app-in-mern.onrender.com',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'connect.sid',
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true,
        httpOnly:true, // ⚠️ Enable this if you're using HTTPS
        sameSite: 'none',
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
