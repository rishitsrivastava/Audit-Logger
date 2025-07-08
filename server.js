import express from "express";
import dotenv from "dotenv";
import auditRoutes from "./routes/auditRoutes.js"
import auditLogger from "./middlewares/auditLogger.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(auditLogger);
app.use('/api/audit', auditRoutes);
app.use('/api/users', userRouter);

app.get("/test", async (req, res) => {
  res.json({ message: "this route was logged", sessionId: req.sessionId });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`server connected on PORT : ${PORT}`);
});
