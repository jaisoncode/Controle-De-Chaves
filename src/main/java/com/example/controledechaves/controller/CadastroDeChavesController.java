package com.example.controledechaves.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class CadastroDeChavesController {

    @GetMapping("/cadastro-de-chaves")
    public String cadastroDeChavesrPage() {
        return "cadastroDeChaves/cadastro-de-chaves"; // Nome do arquivo HTML a ser renderizado (sem extensão)
    }

    @GetMapping("/cadastro-de-setor")
    public String cadastroDeSetorPage() {
        return "cadastroDeChaves/cadastro-de-setor";
    }

    @GetMapping("/cadastro-de-localizacao")
    public String cadastroDeLocalizacaoPage() {
        return "cadastroDeChaves/cadastro-de-localizacao";
    }
}
