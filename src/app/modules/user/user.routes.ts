import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';

export default [
    {
        path     : '',
        redirectTo: 'shop',
        pathMatch: 'full'
    },
    {
        path     : 'shop',
        component: ShopComponent,
    },
] as Routes;
