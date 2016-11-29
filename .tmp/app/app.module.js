import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CadastroEmpresasPage } from '../pages/cadastro-empresas/cadastro-empresas';
import { ListaEmpresasPage } from '../pages/lista-empresas/lista-empresas';
import { LoadingController } from 'ionic-angular';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        CadastroEmpresasPage,
                        ListaEmpresasPage
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
                    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, LoadingController]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map