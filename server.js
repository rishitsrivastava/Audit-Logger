import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import redisClient from "./config/redis.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`server connected on PORT : ${PORT}`)
})