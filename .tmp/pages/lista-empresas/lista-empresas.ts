import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CadastroEmpresasPage } from '../cadastro-empresas/cadastro-empresas';


@Component({
    selector: 'list-page',
    templateUrl: 'lista-empresas.html'
})

export class ListaEmpresasPage {
    empresa = {
        id: 0,
        nome: "",
        cnpj: "",
        razao_social: "",
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        unidade: "",
        ibge: "",
        gia: ""
    };

    lista = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        if (this.lista.length == 0) {
            // Dados Mockados.
            this.lista = [
                { id: 1, nome: 'Tecnologia', cnpj: '61.403.208/0001-46', razao_social: "Software House SA.",
                  cep: "058204040", logradouro: "Avenida Faria Lima", complemento: "cj 100", bairro: "Pinheiros",
                  localidade: "São Paulo", uf: "SP", unidade: "", ibge: "0223011", gia: "1004"
                },
                { id: 2, nome: 'Mercado Financeiro', cnpj: '13.803.672/0001-87', razao_social: "JP Morgan SA.",
                  cep: "05904020", logradouro: "Avenida Paulista", complemento: "cj 100", bairro: "Consolação",
                  localidade: "São Paulo", uf: "SP", unidade: "", ibge: "0245011", gia: "1004"
                }   
            ];
        }
    }

    // Preenche os campos de uma empresa já cadastrada.
    editarDadosEmpresa(event, item) {
        this.empresa.id = item.id;
        this.empresa.nome = item.nome;
        this.empresa.cnpj = item.cnpj;
        this.empresa.razao_social = item.razao_social;
        this.empresa.cep = item.cep;
        this.empresa.logradouro = item.logradouro;
        this.empresa.complemento = item.complemento;
        this.empresa.bairro = item.bairro;
        this.empresa.localidade = item.localidade;
        this.empresa.uf = item.uf;
        this.empresa.unidade = item.unidade;
        this.empresa.ibge = item.ibge;
        this.empresa.gia = item.gia;

        this.navCtrl.push(CadastroEmpresasPage, { empresa: this.empresa, lista: this.lista, cadastro: false });
    }

    // Preenche os campos de uma nova empresa.
    cadastrarEmpresa(event) {
        let empresa  = {
            nome: "",
            cnpj: "",
            razao_social: "",
            cep: "",
            logradouro: "",
            complemento: "",
            bairro: "",
            localidade: "",
            uf: "",
            unidade: "",
            ibge: "",
            gia: ""
        };

        this.navCtrl.push(CadastroEmpresasPage, { empresa: empresa, lista: this.lista, cadastro: true });
    }
}
