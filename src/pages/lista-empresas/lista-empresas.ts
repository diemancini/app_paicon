import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CadastroEmpresasPage } from '../cadastro-empresas/cadastro-empresas';

//import { DAOPage } from '../../DAO/DAO';


@Component({
    selector: 'list-page',
    templateUrl: 'lista-empresas.html'
})

export class ListaEmpresasPage {
    empresa = {
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
    items = [];

    /*items: Array<{
        nome: string,
        cnpj: string,
        razao_social: string,
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
        unidade: string,
        ibge: string,
        gia: string
    }>;*/

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        if (this.items.length == 0) {
            this.items = [
                { nome: 'Tecnologia', cnpj: '61.403.208/0001-46', razao_social: "Software House SA.",
                  cep: "058204040", logradouro: "Avenida Faria Lima", complemento: "cj 100", bairro: "Pinheiros",
                  localidade: "São Paulo", uf: "SP", unidade: "", ibge: "0223011", gia: "1004"
                },
                { nome: 'Mercado Financeiro', cnpj: '13.803.672/0001-87', razao_social: "JP Morgan SA.",
                  cep: "05904020", logradouro: "Avenida Paulista", complemento: "cj 100", bairro: "Consolação",
                  localidade: "São Paulo", uf: "SP", unidade: "", ibge: "0245011", gia: "1004"
                }   
            ];
        }
        //let DAO = new DAOPage();

        /*this.items = [];
        for(let i = 1; i < items.lenght; i++) {
            this.items.push({
                nome: 'Item ' + i,
                cnpj: "0550803"+(Math.floor(Math.random() * i)),
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
                //: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }*/
    }

    editarDadosEmpresa(event, item) {
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

        this.navCtrl.push(CadastroEmpresasPage, { empresa: this.empresa, lista: this.items, cadastro: false });
    }

    cadastrarEmpresa(event) {
        this.empresa.nome = "";
        this.empresa.cnpj = "";
        this.empresa.razao_social = "";
        this.empresa.cep = "";
        this.empresa.logradouro = "";
        this.empresa.complemento = "";
        this.empresa.bairro = "";
        this.empresa.localidade = "";
        this.empresa.uf = "";
        this.empresa.unidade = "";
        this.empresa.ibge = "";
        this.empresa.gia = "";

        this.navCtrl.push(CadastroEmpresasPage, { empresa: this.empresa, lista: this.items, cadastro: true });
    }
}
