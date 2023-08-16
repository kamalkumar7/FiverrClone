import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./routes/user.route.js";
import AuthRoute from "./routes/auth.route.js";
import ConversationRoute from "./routes/conversation.route.js";
import GigRoute from "./routes/gig.route.js";
import MessageRoute from "./routes/message.route.js";
import OrderRoute from "./routes/order.route.js";
import ReviewRoute from "./routes/review.route.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    }
    catch (error) {
        console.log(error);
    }
}

app.use(cors({ origin: "https://fiverrclone-sfqc.onrender.com", credentials: true }));

app.use(express.static('build'));


app.use(express.json())
app.use(cookieParser())
app.get('*',(req,res)=>{
    res.sendFile(path.join(__filename,'./build/index.html'));
  })

app.use("/api/auth", AuthRoute);
app.use("/api/conversations", ConversationRoute);
app.use("/api/gigs", GigRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/reviews", ReviewRoute);
app.use("/api/messages", MessageRoute);
app.use("/api/users", UserRoute);






app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });

app.listen(8800, () => {
    connect()
    console.log("Backend is running")
})
