import db from "../config/db.js";
import axios from "axios";

export async function getLogsBySession(sessionId) {
  const query = `SELECT * FROM audit_logs WHERE session_id = $1 ORDER BY timestamp ASC LIMIT 5`;

  const { rows } = await db.query(query, [sessionId]);
  return rows;
}

export async function simulateRequests(logs) {
  const results = [];
  for (const log of logs) {
    const { method, route, body } = log;

    if (route.startsWith("/api/audit/replay")) {
      results.push({
        route,
        skipped: true,
        reason: "Replay route - skipping to avoid recursion",
      });
      continue;
    }

    try {
      const response = await axios({
        method: method.toLowerCase(),
        url: `http://localhost:5000${route}`,
        data: body,
        headers: {
          "x-replay-mode": "true",
        },
      });

      results.push({
        route,
        status: response.status,
        data: response.data,
      });
    } catch (err) {
      results.push({
        route,
        error: err.message,
      });
    }
  }

  return results;
}
