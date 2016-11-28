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
		// If we navigated to this page, we will have an item available as a nav param
		this.empresa = navParams.get('empresa');
		this.cadastro = navParams.get('cadastro');
		this.lista = navParams.get('lista');
		//alert("empresa: "+ this.empresa.nome);
	}

	private atualizarDadosEmpresa(dadosEmpresa) {
		//let n = this.lista.length;
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
		return -1;
	}

	salvar(event, dadosEmpresa) {
		//alert("Nome da empresa: "+ dadosEmpresa.nome +" id: "+ dadosEmpresa.id);
		//alert("cadastro: "+ this.cadastro);

		if (this.cadastro) {
			//console.log("É para adicionar essa empresa à lista");
			let n = this.lista.length;
			let id = this.lista[n-1].id;
			dadosEmpresa.id = id+1;
			this.lista.push(dadosEmpresa);
		}
		else {
			this.atualizarDadosEmpresa(dadosEmpresa);
			/*console.log("id: "+ id);
			id--;
			if (id > -1) {
				this.lista[id].nome = dadosEmpresa.nome;
				this.lista[id].cnpj = dadosEmpresa.cnpj;
				this.lista[id].razao_social = dadosEmpresa.razao_social;
				this.lista[id].cep = dadosEmpresa.cep;
				this.lista[id].logradouro = dadosEmpresa.logradouro;
				this.lista[id].complemento = dadosEmpresa.complemento;
				this.lista[id].bairro = dadosEmpresa.bairro;
				this.lista[id].localidade = dadosEmpresa.localidade;
				this.lista[id].uf = dadosEmpresa.uf;
				this.lista[id].unidade = dadosEmpresa.unidade;
				this.lista[id].ibge = dadosEmpresa.ibge;
				this.lista[id].gia = dadosEmpresa.gia;
			}*/

		}
		
		this.navCtrl.pop();
    }

    onInputBlur(event, dadosEmpresa) {
        //alert("dadosEmpresa.cep: "+ dadosEmpresa.cep);
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
				console.log("Error:"+ error.error); // error message as string
				console.log("Error:"+ error.headers);

			});
    }
}
