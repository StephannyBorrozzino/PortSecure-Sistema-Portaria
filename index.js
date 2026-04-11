const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const app = express();
require('dotenv').config();

const postsecureRotes = require("./Routes/portsecure.routes");

app.use(morgan("dev"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true })); // Adicionado para parsear dados de formulários
app.use(express.json()); // Adicionado para parsear dados JSON

const porta = Number(process.env.PORTA);

app.use("/", postsecureRotes);

app.get("/cadastroDeRegistro", (req, res) => {
  res.render("cadastroRegistro", { alerta: null, dados: {} });
});

//O método 'use' é considerado a rota padrão caso a rota desejada não seja encontrada.
app.use((req, res) => {
  //Se nenhuma rota aparecer, seremos redirecionados ao erro 404.
  res.status(404).render("erro404");
});

// servidor no ar
app.listen(porta, () => {
  console.log("Servidor rodando");
  console.log("Endereco: http://localhost:" + porta);
});