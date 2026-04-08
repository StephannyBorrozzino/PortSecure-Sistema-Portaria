const express = require("express");
const tarefasController = require(); //Colocar o caminho para o arquivo do controller!!!!!!
const router = express.Router();

router.get("/", tarefasController.mostrarTarefas);

module.exports = router; //Permite com que as rotas sejam usadas fora desse arquivo.