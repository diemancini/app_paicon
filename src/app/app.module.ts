import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CadastroEmpresasPage } from '../pages/cadastro-empresas/cadastro-empresas';
import { ListaEmpresasPage } from '../pages/lista-empresas/lista-empresas';

@NgModule({
  declarations: [
    MyApp,
    CadastroEmpresasPage,
    ListaEmpresasPage
    //HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CadastroEmpresasPage,
    ListaEmpresasPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
