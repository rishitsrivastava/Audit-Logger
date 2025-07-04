// import pkg from "pg";
// const { Client } = pkg;

// import dotenv from "dotenv";

// dotenv.config();

// const client = new Client({
//   connectionString: process.env.POSTGRES_URL, // use your .env connection string
//   ssl: {
//     rejectUnauthorized: false, // important for Neon
//   },
// });

// async function createTable() {
//   await client.connect();
//   console.log("🔗 Connecting to:", process.env.POSTGRES_URL);

//   const query = `
//     CREATE TABLE IF NOT EXISTS audit_logs (
//       id SERIAL PRIMARY KEY,
//       event_type VARCHAR(50) NOT NULL,
//       event_payload JSONB NOT NULL,
//       user_id UUID,
//       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   try {
//     await client.query(query);
//     console.log("Table created successfully");
//   } catch (err) {
//     console.error("Error creating table:", err);
//   } finally {
//     await client.end();
//   }
// }

// createTable();
