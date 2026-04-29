const express = require("express");
const portariaController = require("../Controllers/portsecure.controller");
const router = express.Router();

// Rota para exibir formulário de cadastro (GET)
router.get("/cadastroDeUsuarios", portariaController.mostrarCadastroUsuarios);
router.post("/cadastroDeUsuarios", portariaController.cadastrarUsuario);

// Rota para registrar movimentação (POST)
router.post("/cadastroDeRegistro", portariaController.registrarMovimentacao);

// Rota para ver a listra de registros
// router.get("/listaDeRegistros", portariaController.(aqui viria a sua função do controller));

// Rota para ver a lista de usuários
router.get("/listaDeUsuarios", portariaController.mostrarUsuarios);

module.exports = router;