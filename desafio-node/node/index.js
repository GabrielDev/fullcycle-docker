import express from 'express';
import { migrate } from './db.js';
import { createUser, getUsers } from './users.js';

const app = express();
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    await createUser(name);
    const usersList = await getUsers();

    const response = `
        <main style="margin: 30px auto; width: 70%">
            <section>
                <h1>Full Cycle Rocks!</h1>
            </section>
            <section>${usersList}</section>
        </main>
        `;

    res.status(200).send(response);
  } catch (error) {
    console.warn(error);
    res.status(500);
  }
});

app.listen(PORT, HOST, async () => {
  console.log(`🚀 Node APP rodando em: http://${HOST}:${PORT}`)
  await migrate();
});
