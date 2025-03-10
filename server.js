const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para permitir requisições de diferentes origens (CORS)
app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota para consultar o CPF
app.post('/consultar-cpf', async (req, res) => {
    const { cpf } = req.body;

    // Validação básica do CPF
    if (!cpf || cpf.length !== 11 || isNaN(cpf)) {
        return res.status(400).json({ error: 'CPF inválido. Deve conter 11 dígitos.' });
    }

    try {
        // Faz a requisição para a API real
        const response = await axios.get(`https://api.thugapplications.xyz/api/cpf?cpf=${cpf}`);
        res.json(response.data); // Retorna os dados da API para o frontend
    } catch (error) {
        console.error('Erro ao consultar a API:', error.message);
        res.status(500).json({ error: 'Erro ao consultar o CPF. Tente novamente.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
