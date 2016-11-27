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

	alterarDadosEmpresa(event, dadosEmpresa) {
		//alert("Nome da empresa: "+ dadosEmpresa.nome);
		alert("cadastro: "+ this.cadastro);

		if (this.cadastro) {
			console.log("É para adicionar essa empresa à lista");
			this.lista.push(dadosEmpresa);
			//this.empresa.add(dadosEmpresa);
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
	  				//console.log("data.data.logradouro"+ response.logradouro);
					this.empresa.logradouro  = response.logradouro;
					this.empresa.localidade  = response.localidade;
					this.empresa.complemento = response.complemento;
					this.empresa.unidade = response.unidade;
					this.empresa.bairro  = response.bairro;
					this.empresa.uf   = response.uf;
					this.empresa.gia  = response.gia;
					this.empresa.ibge = response.ibge;
					//console.log("this.empresa.logradouro"+ this.empresa.logradouro);
					//console.log(data.status);
					//console.log(data.data); // data received by server
					//console.log(data.headers);
				}

			})
			.catch(error => {

				console.log("Error:"+ error.status);
				console.log("Error:"+ error.error); // error message as string
				console.log("Error:"+ error.headers);

			});
    }
}
