package com.example.controledechaves.dtos.setor;

public record SetorRequestDTO(String nome){
    @Override
    public String nome() {
        return nome;
    }
}
