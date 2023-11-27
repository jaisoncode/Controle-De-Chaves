package com.example.controledechaves.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.controledechaves.dtos.chave.ChaveRequestDTO;

@Entity
@Table(name = "chaves")
public class Chave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idChave;
    @Column(name = "nome")
    private String nome;
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "idSetor")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Setor setor;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "idLocalizacao")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Localizacao localizacao;

    public Chave() {

    }

    public Chave(ChaveRequestDTO chave, Localizacao localizacao, Setor setor) {
        this.nome = chave.nome();
        this.setor = setor;
        this.localizacao = localizacao;
    }

    public Long getIdSala() {
        return idChave;
    }

    public void setIdSala(Long idSala) {
        this.idChave = idSala;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }

    public Setor getSetor() {
        return setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

}
