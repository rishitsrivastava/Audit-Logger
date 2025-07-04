import { timeStamp } from "console";
import saveAuditLog from "../models/auditLog.js";
import { randomUUID } from "crypto";

export default async function auditLogger(req, res, next) {
  try {
    const userId = req.user?.id || "anonymous";
    const sessionId = req.headers["x-session-id"] || randomUUID();
    req.sessionId = sessionId;

    const logData = {
      userId,
      method: req.method,
      route: req.originalUrl,
      body: req.body,
      sessionId,
    };

    console.log(logData);

    await saveAuditLog(logData);
    next();
  } catch (err) {
    console.error("Audit middleware error: ", err);
  }
}
