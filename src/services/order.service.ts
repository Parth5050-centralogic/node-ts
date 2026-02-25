import pool from "../config/pgConfig";

const TABLE_NAME = "orders";

async function ensureTable(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id SERIAL PRIMARY KEY,
        "orderID" VARCHAR(255)
      )
    `);
  } finally {
    client.release();
  }
}

export async function insertOrderIds(orderIds: string[]): Promise<string[]> {
  if (orderIds.length === 0) return [];

  await ensureTable();

  const client = await pool.connect();
  const inserted: string[] = [];

  try {
    for (const orderID of orderIds) {
      const res = await client.query(
        `INSERT INTO ${TABLE_NAME} ("orderID") VALUES ($1) RETURNING "orderID"`,
        [orderID]
      );
      inserted.push(res.rows[0].orderID);
    }
    return inserted;
  } finally {
    client.release();
  }
}
