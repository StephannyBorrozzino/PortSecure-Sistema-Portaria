const portariaModel = require("../Models/portsecure.model");

function enviarAlerta(res, mensagem, dados = {}) {
    return res.status(400).json({
        ok: false,
        message: mensagem,
        dados: dados
    });
}

async function registrarMovimentacao(req, res) {
    try {
        // Agora pegamos os dados da requisição como JSON
        const { usuario_id, movimentacao, horario } = req.body;

        // O resto da lógica de validação permanece a mesma
        if (!usuario_id || !movimentacao || !horario) {
            return enviarAlerta(res, "Preencha usuário, movimentação e horário corretamente.", { usuario_id, movimentacao });
        }

        var usuario = await portariaModel.buscarUsuarioPorId(usuario_id);
        if (!usuario) {
            return enviarAlerta(res, "Usuário não encontrado", { usuario_id, movimentacao });
        }

        var ultimoRegistro = await portariaModel.buscarUltimoRegistroPorUsuario(usuario_id);
        if (!ultimoRegistro && movimentacao === "saida") {
            return enviarAlerta(res, "Não é possível registrar saída sem entrada primeiro.", { usuario_id, movimentacao });
        }

        if (ultimoRegistro && ultimoRegistro.tipo === movimentacao) {
            const proximaMovimentacao = movimentacao === "entrada" ? "saída" : "entrada";
            return enviarAlerta(res, `Erro: Você já registrou uma ${movimentacao}. Registre uma ${proximaMovimentacao} antes de registrar uma nova ${movimentacao}.`, { usuario_id, movimentacao });
        }

        // Registrando a movimentação no banco de dados
        await portariaModel.criarRegistro({
            usuario_id,
            tipo_movimentacao: movimentacao,
            horario
        });

        return res.json({ ok: true }); // Retornando sucesso
    } catch (erro) {
        console.error("Erro ao registrar movimentação:", erro);
        return res.status(500).json({ ok: false, message: "Erro ao registrar a movimentação." });
    }
}

const mostrarCadastroUsuarios = (req, res) => {
    return res.render("cadastroUsuarios", { alerta: null, dados: {} });
};

const mostrarCadastroRegistro = async (req, res) => {
    const usuarios = await portariaModel.readAllUsers();

    return res.render("cadastroRegistro", {
        alerta: null,
        dados: {
            usuarios: usuarios || [],
            cpf: "",
            movimentacao: ""
        }
    });
};

const cadastrarUsuario = async (req, res) => {
    try {
        const nome = req.body.nome_usuario;
        const cpfRaw = req.body.cpf_usuario;
        const cpf = String(cpfRaw || "").replace(/\D/g, "");

        if (!nome || !cpf) {
            return enviarAlerta(res, "Preencha corretamente o Nome e o CPF");
        }

        if (cpf.length !== 11) {
            return enviarAlerta(res, "CPF deve conter exatamente 11 caracteres. Por favor, verifique o valor.");
        }

        const usuarioExistente = await portariaModel.buscarUsuarioPorCpf(cpf);
        if (usuarioExistente) {
            return enviarAlerta(res, "CPF já cadastrado. Use outro CPF ou verifique o usuário existente.");
        }

        await portariaModel.criarUsuario({ nome_usuario: nome, cpf_usuario: cpf });

        return res.redirect("/cadastroDeUsuarios");
    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);
        return res.status(500).render("erro404", {
            mensagem: "Erro ao cadastrar usuário",
        });
    }
};

const mostrarUsuarios = async (req, res) => {
    try {
        const usuarios = await portariaModel.readAllUsers();
        res.render("listaUsuarios", { title: "Listagem de Usuários", dados: usuarios });
    } catch (erro) {
        console.error("Erro ao buscar usuários:", erro);
        res.status(500).render("erro404", { mensagem: "Erro ao buscar usuários" });
    }
};

async function deletarUsuario(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("ID não informado");
        }

        await portariaModel.deletarUsuario(id);

        return res.json({ ok: true });

    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);

        return res.status(500).render("erro404", {
            mensagem: "Erro ao deletar o usuário"
        });
    }
}

async function atualizarUsuario(req, res) {
    try {
        const id = req.params.id;
        const { nome, cpf } = req.body;

        await portariaModel.atualizarUsuario(id, nome, cpf);

        return res.json({ ok: true });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ ok: false });
    }
}

const mostrarRegistros = async (req, res) => {
    try {
        const registros = await portariaModel.listarRegistros();

        return res.render("listaRegistros", {
            title: "Registros de Movimentação",
            dados: registros
        });

    } catch (erro) {
        console.error("Erro ao buscar registros:", erro);

        return res.status(500).render("erro404", {
            mensagem: "Erro ao buscar registros"
        });
    }
};

async function deletarRegistro(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("ID não informado");
        }

        await portariaModel.deletarRegistro(id);

        return res.json({ ok: true });

    } catch (erro) {
        console.error("Erro ao deletar registro:", erro);

        return res.status(500).render("erro404", {
            mensagem: "Erro ao deletar o registro"
        });
    }
}

module.exports = {
    registrarMovimentacao,
    mostrarCadastroUsuarios,
    mostrarCadastroRegistro,
    cadastrarUsuario,
    mostrarUsuarios,
    mostrarRegistros,
    deletarUsuario,
    deletarRegistro,
    atualizarUsuario
};