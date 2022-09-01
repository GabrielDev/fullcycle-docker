import mysql from 'mysql';

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const execQuery = async (sql, callback) => {
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

const getUserTable = (users = []) => {
  let list = [`
        <tr>
            <td colspan="2">Nenhum registro encontrado</td>
        </tr>
    `];

  if (users.length) {
    list = users
      .map(user => ({ ...user, created_at: new Date(user.created_at) }))
      .map(user => `<tr><td align="center">${user.created_at.toLocaleString('pt-BR')}</td><td>${user.name}</td></tr>`);
  }

  return `
    <h3>Cadastros</h3>
    <table width="80%" border="1px" cellpadding="10px">
      <thead>
        <tr>
          <th align="center" width="180px">
            Criado em
          </th>
          <th>
            Nome
          </th> 
        </tr>
      </thead>
      <tbody>
        ${list.join('')}
      </tbody>
    </table>
    `;
};

export const getUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM people ORDER BY created_at DESC`;

    execQuery(sql, (error, users) => {
      if (error) reject(error);

      resolve(getUserTable(users));
    });
  });
};

export const createTableIfNotExists = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255), 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  return execQuery(sql, error => {
    if (error) throw error;
  });
};

export const createUser = async (name = 'Full Cycle') => {
  await createTableIfNotExists();

  const sql = `INSERT INTO people(name) values("${name}")`;

  return execQuery(sql, error => {
    if (error) throw error;
  });
};
