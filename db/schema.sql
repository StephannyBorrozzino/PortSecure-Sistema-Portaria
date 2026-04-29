CREATE DATABASE IF NOT EXISTS bd_portsecure;

use bd_portsecure;

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    cpf_usuario VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE Registros (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('entrada', 'saida') NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);