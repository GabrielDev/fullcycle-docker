import mysql from 'mysql';

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const execQuery = async (sql, callback) => {
  try {
    const connection = mysql.createConnection(config);
    const result = await connection.query(sql, callback);
    connection.end();
    return result;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const migrate = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS people (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255), 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

  return execQuery(sql, error => {
    if (error) throw error;
  });
};
