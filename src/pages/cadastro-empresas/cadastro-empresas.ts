import { Component } from '@angular/core';
import { HTTP, Toast } from 'ionic-native';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
	selector: 'cadastro-page',
	templateUrl: 'cadastro-empresas.html'
})

export class CadastroEmpresasPage {
	loader: any;
	dadosForm: any;
	empresa: any;
	cadastro: boolean;
	lista = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder, public loadingCtrl: LoadingController) {
		this.empresa = navParams.get('empresa');
		this.cadastro = navParams.get('cadastro');
		this.lista = navParams.get('lista');

		// Valida os dados inseridos.
		this.dadosForm = builder.group({
			"nome": ["", Validators.required], 
			"razao_social": ["", Validators.required],
			"cnpj": ["", Validators.compose([Validators.required, Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})")])],
			"cep": ["",Validators.compose([Validators.required, Validators.pattern('([0-9]{8})')])],
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
	private atualizarDadosEmpresa(dadosEmpresa) {
		
		for (let i = 0; i < this.lista.length; i++) {
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
	}

	// Atualiza os campos de uma empresa existente ou salva uma nova empresa cadastrada.
	salvar(dadosEmpresa) {
		//let mensagem = "";

		if (this.cadastro) {
			let n = this.lista.length;
			let id = this.lista[n-1].id;
			dadosEmpresa.id = id+1;
			//mensagem = "A empresa foi cadastrada com sucesso!";

			this.lista.push(dadosEmpresa);
		}
		else {
			this.atualizarDadosEmpresa(dadosEmpresa);
			//cmensagem = "Os dados da empresa foram alterados com sucesso!";
		}
		
		/*Toast.show(mensagem, '3000', 'bottom').subscribe(
			toast => {
				console.log(toast);
			}
		);*/
		this.navCtrl.pop();
    }

    // Essa função busca um cep válido no site "viaCep" e preenche os campos de logradouro, bairro, etc...
    onInputBlur(event, dadosEmpresa) {
        let url = 'https://viacep.com.br/ws/'+ dadosEmpresa.cep +'/json/unicode/';

        this.loader.present();

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

				this.loader.dismiss();
			})
			.catch(error => {
				console.log("Error:"+ error.status);
				console.log("Error:"+ error.error); 
				console.log("Error:"+ error.headers);
				
				this.loader.dismiss();
			});
    }
}
