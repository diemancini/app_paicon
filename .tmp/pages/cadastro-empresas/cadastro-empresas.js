import { Component } from '@angular/core';
import { HTTP } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
export var CadastroEmpresasPage = (function () {
    function CadastroEmpresasPage(navCtrl, navParams, builder, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.builder = builder;
        this.loadingCtrl = loadingCtrl;
        this.lista = [];
        this.empresa = navParams.get('empresa');
        this.cadastro = navParams.get('cadastro');
        this.lista = navParams.get('lista');
        // Valida os dados inseridos.
        this.dadosForm = builder.group({
            "nome": ["", Validators.required],
            "razao_social": ["", Validators.required],
            "cnpj": ["", Validators.compose([Validators.required, Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})")])],
            "cep": ["", Validators.compose([Validators.required, Validators.pattern('([0-9]{8})')])],
            "logradouro": "",
            "complemento": "",
            "bairro": "",
            "localidade": "",
            "uf": "",
            "unidade": "",
            "ibge": "",
            "gia": ""
        });
        // Usado para o popup da busca do cep.
        this.loader = this.loadingCtrl.create({
            content: "Buscando CEP ...",
            duration: 5000
        });
    }
    // Atualiza os dados da tela de edição de empresas.
    CadastroEmpresasPage.prototype.atualizarDadosEmpresa = function (dadosEmpresa) {
        for (var i = 0; i < this.lista.length; i++) {
            if (this.lista[i].id === this.empresa.id) {
                //alert("nome alterado para:"+ dadosEmpresa.nome);
                this.lista[i].nome = dadosEmpresa.nome;
                this.lista[i].cnpj = dadosEmpresa.cnpj;
                this.lista[i].razao_social = dadosEmpresa.razao_social;
                this.lista[i].cep = dadosEmpresa.cep;
                this.lista[i].logradouro = dadosEmpresa.logradouro;
                this.lista[i].complemento = dadosEmpresa.complemento;
                this.lista[i].bairro = dadosEmpresa.bairro;
                this.lista[i].localidade = dadosEmpresa.localidade;
                this.lista[i].uf = dadosEmpresa.uf;
                this.lista[i].unidade = dadosEmpresa.unidade;
                this.lista[i].ibge = dadosEmpresa.ibge;
                this.lista[i].gia = dadosEmpresa.gia;
            }
        }
    };
    // Atualiza os campos de uma empresa existente ou salva uma nova empresa cadastrada.
    CadastroEmpresasPage.prototype.salvar = function (dadosEmpresa) {
        //let mensagem = "";
        if (this.cadastro) {
            var n = this.lista.length;
            var id = this.lista[n - 1].id;
            dadosEmpresa.id = id + 1;
            //mensagem = "A empresa foi cadastrada com sucesso!";
            this.lista.push(dadosEmpresa);
        }
        else {
            this.atualizarDadosEmpresa(dadosEmpresa);
        }
        /*Toast.show(mensagem, '3000', 'bottom').subscribe(
            toast => {
                console.log(toast);
            }
        );*/
        this.navCtrl.pop();
    };
    // Essa função busca um cep válido no site "viaCep" e preenche os campos de logradouro, bairro, etc...
    CadastroEmpresasPage.prototype.onInputBlur = function (event, dadosEmpresa) {
        var _this = this;
        var url = 'https://viacep.com.br/ws/' + dadosEmpresa.cep + '/json/unicode/';
        this.loader.present();
        HTTP.get(url, {}, {})
            .then(function (data) {
            if (data.status == 200) {
                var response = JSON.parse(data.data);
                _this.empresa.logradouro = response.logradouro;
                _this.empresa.localidade = response.localidade;
                _this.empresa.complemento = response.complemento;
                _this.empresa.unidade = response.unidade;
                _this.empresa.bairro = response.bairro;
                _this.empresa.uf = response.uf;
                _this.empresa.gia = response.gia;
                _this.empresa.ibge = response.ibge;
            }
            _this.loader.dismiss();
        })
            .catch(function (error) {
            console.log("Error:" + error.status);
            console.log("Error:" + error.error);
            console.log("Error:" + error.headers);
            _this.loader.dismiss();
        });
    };
    CadastroEmpresasPage.decorators = [
        { type: Component, args: [{
                    selector: 'cadastro-page',
                    templateUrl: 'cadastro-empresas.html'
                },] },
    ];
    /** @nocollapse */
    CadastroEmpresasPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: FormBuilder, },
        { type: LoadingController, },
    ];
    return CadastroEmpresasPage;
}());
//# sourceMappingURL=cadastro-empresas.js.map