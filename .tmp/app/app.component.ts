import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import { CadastroEmpresasPage } from '../pages/cadastro-empresas/cadastro-empresas';
import { ListaEmpresasPage } from '../pages/lista-empresas/lista-empresas';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = ListaEmpresasPage;
  statusBar = StatusBar;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
