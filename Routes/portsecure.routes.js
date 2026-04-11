const express = require("express");
const portariaController = require("../Controllers/portsecure.controller");
const router = express.Router();

// 💥💥💥 Família, eu ja deixei meio que pronto a rota de cada um na nav, 
// 💥💥💥 é só vocês colocarem algo na view e escreverem a sua parte na URL pra ela abrir,
// 💥💥💥 ou clicar nos links da nav.
// 💥💥💥 (coloquei esses emojis pra chamar a atenção de voces 👌)
// 💥💥💥 tirem a parte de voces do comentario pra funcionar ⬇️⬇️⬇️


// Rota para exibir formulário de cadastro (GET)
//router.get("/cadastroDeUsuarios", portariaController.(aqui viria a sua função do controller));

// Rota para registrar movimentação (POST)
router.post("/cadastroDeRegistro", portariaController.registrarMovimentacao);

// Rota para ver a listra de registros
// router.get("/listaDeRegistros", portariaController.(aqui viria a sua função do controller));

// Rota para ver a lista de usuários
router.get("/listaDeUsuarios", portariaController.mostrarUsuarios);

module.exports = router;