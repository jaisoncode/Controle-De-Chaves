package com.example.controledechaves.dtos.localizacao;

public record LocalizacaoRequestDTO(String nomePredio) {
    @Override
    public String nomePredio() {
        return nomePredio;
    }
}
