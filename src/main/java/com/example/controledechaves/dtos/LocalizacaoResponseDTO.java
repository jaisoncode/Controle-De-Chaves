package com.example.controledechaves.dtos;

import com.example.controledechaves.model.Localizacao;

public record LocalizacaoResponseDTO(Long id, String nome) {
    public LocalizacaoResponseDTO(Localizacao localizacao){
        this(localizacao.getIdLocalizacao(), localizacao.getNomePredio());
    }
    
}
