import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyComponent } from './currencies/currency.component';
import { DetailComponent } from './currencies/detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: CurrencyComponent

    },
    {
        path: 'detail/:alphaCode',
        component: DetailComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
