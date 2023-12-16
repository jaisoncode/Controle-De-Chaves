package com.example.controledechaves.model.usuario;

public enum UsuarioRole {

    MASTER("master"),
    ADMIN("admin"),
    RECEPCAO("recepcao"),
    USER("user");

    private  String role;

    UsuarioRole(String role){
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
