import express from "express";
import dotenv from "dotenv";
import auditLogger from "./middlewares/auditLogger.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(auditLogger);

app.get("/test", async (req, res) => {
  res.json({ message: "this route was logged", sessionId: req.sessionId });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`server connected on PORT : ${PORT}`);
});
