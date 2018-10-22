import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CurrencyComponent } from './currencies/currency.component';

const routes: Routes = [
    /*{
        path: '',
        component: CurrencyComponent

    },
    {
        path: 'detail',
        component: CurrencyComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }*/
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
