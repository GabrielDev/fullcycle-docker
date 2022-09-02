import { execQuery } from './db.js';

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

export const createUser = async (name = 'Full Cycle') => {
  const sql = `INSERT INTO people(name) values("${name}")`;

  return execQuery(sql, error => {
    if (error) throw error;
  });
};
