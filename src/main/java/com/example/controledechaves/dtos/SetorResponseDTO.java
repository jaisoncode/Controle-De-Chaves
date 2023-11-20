package com.example.controledechaves.dtos;

import com.example.controledechaves.model.Setor;

public record SetorResponseDTO(Long id, String nome) {
    public SetorResponseDTO(Setor setor){

        this(setor.getIdSetor(), setor.getNome());
    }
    
}
