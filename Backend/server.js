const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Importa o arquivo de rotas

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Injeta o arquivo de rotas no servidor
// Se você usar '/', a rota fica direto: http://localhost:3000/login
// Se você usar '/api', a rota mudaria para: http://localhost:3000/api/login
app.use('/', apiRoutes);

// Inicialização do Servidor sem deploy
//app.listen(3000, () => {
//    console.log('Servidor Backend rodando na porta 3000');
//});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});