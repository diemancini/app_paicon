import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ListaEmpresasPage } from '../pages/lista-empresas/lista-empresas';
export var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        this.rootPage = ListaEmpresasPage;
        this.statusBar = StatusBar;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    MyApp.decorators = [
        { type: Component, args: [{
                    template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
    ];
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map