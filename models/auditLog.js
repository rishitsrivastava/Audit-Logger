import db from "../config/db.js";

export default async function saveAuditLog({
  userId,
  method,
  route,
  body,
  sessionId,
}) {
  try {
    const query = `INSERT INTO audit_logs (user_id, method, route, body, session_id) VALUES ($1, $2, $3, $4, $5)`;

    const values = [userId, method, route, body, sessionId];
    await db.query(query, values);
  } catch (err) {
    console.error(" error saving audit log: ", err);
  }
}
