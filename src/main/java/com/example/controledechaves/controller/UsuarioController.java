package com.example.controledechaves.controller;

import com.example.controledechaves.model.usuario.Usuario;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    public Usuario createUsuario(){
        return createUsuario();
    }
}
