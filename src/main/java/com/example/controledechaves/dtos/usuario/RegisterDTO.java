package com.example.controledechaves.dtos.usuario;

import com.example.controledechaves.model.usuario.UsuarioRole;

public record RegisterDTO(String nomeUsuario, String login, String senha, UsuarioRole role) {
}
