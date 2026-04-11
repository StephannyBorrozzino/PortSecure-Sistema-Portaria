const db = require("../db/dbConnect");

class Portaria {
    static async buscarUsuarioPorCpf(cpf) {
        const query =
            "SELECT id_usuario, nome_usuario, cpf_usuario FROM Usuarios WHERE cpf_usuario = ?";
        const rows = await db.executarQuery(query, [cpf]);
        return rows.length ? rows[0] : null;
    }

    static async buscarUltimoRegistroPorUsuario(usuarioId) {
        const query =
            "SELECT tipo FROM Registros WHERE id_usuario = ? ORDER BY data_hora DESC LIMIT 1";
        const rows = await db.executarQuery(query, [usuarioId]);
        return rows.length ? rows[0] : null;
    }

    static async criarRegistro(dados) {
        const { usuario_id, tipo_movimentacao, horario } = dados;
        const query =
            "INSERT INTO Registros (tipo, data_hora, id_usuario) VALUES (?, ?, ?)";
        return await db.executarQuery(query, [
            tipo_movimentacao,
            horario,
            usuario_id,
        ]);
    }

    static async readAllUsers() {

        console.log("Model ", "readAllUsers");

        const query = " SELECT * FROM Usuarios;";

        return db.executarQuery(query);

    }
}

module.exports = Portaria;