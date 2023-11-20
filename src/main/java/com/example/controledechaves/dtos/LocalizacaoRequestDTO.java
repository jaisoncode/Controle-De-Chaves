package com.example.controledechaves.dtos;

public record LocalizacaoRequestDTO(String nomePredio) {
    @Override
    public String nomePredio() {
        return nomePredio;
    }
}
