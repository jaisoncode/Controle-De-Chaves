package com.example.controledechaves.dtos;

public record SetorRequestDTO(String nome){
    @Override
    public String nome() {
        return nome;
    }
}
