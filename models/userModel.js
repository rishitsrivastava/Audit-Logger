import db from "../config/db.js";
import bcrypt from "bcrypt";

export async function createUser({ email, password, role = "user" }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (email, password, role) VALUES ($1,  $2, $3) RETURNING id, email, role`;

  const { rows } = await db.query(query, [email, hashedPassword, role]);
  return rows[0];
}

export async function findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await db.query(query, [email]);

    return rows[0];
}
