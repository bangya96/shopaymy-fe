import { Routes } from '@angular/router';
import { ShopsListComponent } from './list/shops-list.component';
import { ShopLayoutComponent } from './shop-layout/shop-layout.component';
import { ShopDashboardComponent } from './dashboard/shop-dashboard.component';
import { ShopPagesComponent } from './pages/shop-pages.component';
import { ShopProductsComponent } from './products/shop-products.component';
import { ShopOrderFormsComponent } from './order-forms/shop-order-forms.component';
import { ShopPaymentsComponent } from './payments/shop-payments.component';
import { ShopMembersComponent } from './members/shop-members.component';
import { ShopSalesComponent } from './sales/shop-sales.component';

export default [
    {
        path: '',
        component: ShopsListComponent,
    },
    {
        path: ':shopId',
        component: ShopLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: ShopDashboardComponent,
            },
            {
                path: 'pages',
                component: ShopPagesComponent,
            },
            {
                path: 'products',
                component: ShopProductsComponent,
            },
            {
                path: 'order-forms',
                component: ShopOrderFormsComponent,
            },
            {
                path: 'payments',
                component: ShopPaymentsComponent,
            },
            {
                path: 'members',
                component: ShopMembersComponent,
            },
            {
                path: 'sales',
                component: ShopSalesComponent,
            },
        ],
    },
] as Routes;
