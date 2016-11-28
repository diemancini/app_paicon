import { Component } from '@angular/core';
import { HTTP } from 'ionic-native';

import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'cadastro-page',
	templateUrl: 'cadastro-empresas.html'
})

export class CadastroEmpresasPage {
	empresa: any;
	cadastro: boolean;
	lista = [];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.empresa = navParams.get('empresa');
		this.cadastro = navParams.get('cadastro');
		this.lista = navParams.get('lista');
	}

	private atualizarDadosEmpresa(dadosEmpresa) {
		for (let i = 0; i < this.lista.length; i++) {
			if (this.lista[i].id === dadosEmpresa.id) {

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
	}

	salvar(event, dadosEmpresa) {

		if (this.cadastro) {
			let n = this.lista.length;
			let id = this.lista[n-1].id;
			dadosEmpresa.id = id+1;
			this.lista.push(dadosEmpresa);
		}
		else {
			this.atualizarDadosEmpresa(dadosEmpresa);
		}
		
		this.navCtrl.pop();
    }

    onInputBlur(event, dadosEmpresa) {
        let url = 'https://viacep.com.br/ws/'+ dadosEmpresa.cep +'/json/unicode/';

        HTTP.get(url, {}, {})
			.then(data => {
				if (data.status == 200) {
	  				let response = JSON.parse(data.data);

					this.empresa.logradouro  = response.logradouro;
					this.empresa.localidade  = response.localidade;
					this.empresa.complemento = response.complemento;
					this.empresa.unidade = response.unidade;
					this.empresa.bairro  = response.bairro;
					this.empresa.uf   = response.uf;
					this.empresa.gia  = response.gia;
					this.empresa.ibge = response.ibge;
				}

			})
			.catch(error => {
				console.log("Error:"+ error.status);
				console.log("Error:"+ error.error); 
				console.log("Error:"+ error.headers);

			});
    }
}
