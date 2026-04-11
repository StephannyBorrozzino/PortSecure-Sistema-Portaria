const portariaModel = require("../Models/portsecure.model");

function enviarAlerta(res, mensagem, dados) {
  return res.render("cadastroRegistro", {
    alerta: mensagem,
    dados: dados || {},
  });
}

async function registrarMovimentacao(req, res) {
  try {
    var cpf = req.body.cpf;
    var movimentacao = req.body.movimentacao;
    var horario = req.body.horario;
    var tipoMovimentacao = null;

    if (movimentacao === "entrada") {
      tipoMovimentacao = "entrada";
    } else if (movimentacao === "saida") {
      tipoMovimentacao = "saida";
    }

    if (!cpf || !tipoMovimentacao || !horario) {
      return enviarAlerta(
        res,
        "Preencha CPF, movimento e horário corretamente.",
        {
          nome: req.body.nome,
          cpf: cpf,
          movimentacao: movimentacao,
        },
      );
    }

    var usuario = await portariaModel.buscarUsuarioPorCpf(cpf);
    if (!usuario) {
      return enviarAlerta(
        res,
        "Usuário não encontrado. Cadastre o usuário primeiro.",
        {
          nome: req.body.nome,
          cpf: cpf,
          movimentacao: movimentacao,
        },
      );
    }

    var ultimoRegistro = await portariaModel.buscarUltimoRegistroPorUsuario(
      usuario.id_usuario,
    );

    if (!ultimoRegistro) {
      if (tipoMovimentacao === "saida") {
        return enviarAlerta(
          res,
          "Não é possível registrar saída sem antes ter registrado uma entrada.",
          {
            nome: req.body.nome,
            cpf: cpf,
            movimentacao: movimentacao,
          },
        );
      }
    } else {
      if (ultimoRegistro.tipo === tipoMovimentacao) {
        var espera = "entrada";
        if (tipoMovimentacao === "entrada") {
          espera = "saída";
        }
        return enviarAlerta(
          res,
          "Movimentação inválida. Já foi registrado " +
            tipoMovimentacao +
            " por último. Registre " +
            espera +
            " antes.",
          {
            nome: req.body.nome,
            cpf: cpf,
            movimentacao: movimentacao,
          },
        );
      }
    }

    await portariaModel.criarRegistro({
      usuario_id: usuario.id_usuario,
      tipo_movimentacao: tipoMovimentacao,
      horario: horario,
    });

    return res.render("cadastroRegistro", {
      alerta:
        "Movimentação registrada com sucesso para " +
        usuario.nome_usuario +
        ".",
      dados: {},
    });
  } catch (erro) {
    console.error("Erro ao registrar movimentação:", erro);
    return res.status(500).render("erro404", {
      mensagem: "Erro ao registrar a movimentação",
    });
  }
}

module.exports = {
  registrarMovimentacao,
};
