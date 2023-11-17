package com.example.controledechaves;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/minha-pagina")
    public String minhaPagina() {
        return "page1"; // Nome do arquivo HTML a ser renderizado (sem extensão)
    }

    @GetMapping("/minha-page")
    public String minhaPage() {
        return "page"; // Nome do arquivo HTML a ser renderizado (sem extensão)
    }
}
