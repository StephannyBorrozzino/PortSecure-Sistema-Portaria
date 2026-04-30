const db = require("../db/dbConnect");

class Portaria {
    static async buscarUsuarioPorId(id) {
        const query = "SELECT * FROM Usuarios WHERE id_usuario = ?";
        const rows = await db.executarQuery(query, [id]);
        return rows.length ? rows[0] : null;
    }

    static async buscarUsuarioPorCpf(cpf) {
        const query =
            "SELECT id_usuario, nome_usuario, cpf_usuario FROM Usuarios WHERE cpf_usuario = ?";
        const rows = await db.executarQuery(query, [cpf]);
        return rows.length ? rows[0] : null;
    }

    static async buscarUltimoRegistroPorUsuario(usuarioId) {
        const query = "SELECT tipo FROM Registros WHERE id_usuario = ? ORDER BY data_hora DESC LIMIT 1";
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

    static async criarUsuario(dados) {
        const { nome_usuario, cpf_usuario } = dados;
        const query =
            "INSERT INTO Usuarios (nome_usuario, cpf_usuario) VALUES (?, ?)";
        return await db.executarQuery(query, [nome_usuario, cpf_usuario]);
    }

    static async readAllUsers() {

        console.log("Model ", "readAllUsers");

        const query = " SELECT * FROM Usuarios;";

        return await db.executarQuery(query);

    }

    // Deletar usuario
    static async deletarUsuario(id) {

        console.log("Model ", "deletarUsuario");

        const query = "DELETE FROM Usuarios WHERE id_usuario = ?";

        return await db.executarQuery(query, [id]);

    }

    // Atualizar usuario
    static async atualizarUsuario(id, nome, cpf) {

        console.log("Model ", "atualizarUsuario");

        const query = `
        UPDATE Usuarios 
        SET nome_usuario = ?, cpf_usuario = ?
        WHERE id_usuario = ?
         `;

        return await db.executarQuery(query, [nome, cpf, id]);

    }


    static async listarRegistros() {
        const query = `
        SELECT 
            r.id_registro,
            r.tipo,
            r.data_hora,
            u.nome_usuario,
            u.cpf_usuario
        FROM Registros r
        INNER JOIN Usuarios u 
            ON r.id_usuario = u.id_usuario
        ORDER BY r.data_hora DESC
    `;

        return await db.executarQuery(query);
    }

    // Deletar registro
    static async deletarRegistro(id) {

        console.log("Model ", "deletarRegistro");

        const query = "DELETE FROM Registros WHERE id_registro = ?";

        return await db.executarQuery(query, [id]);

    }
}

module.exports = Portaria;