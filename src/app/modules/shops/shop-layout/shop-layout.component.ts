import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShopGraphqlService } from 'app/core/graphql/shop.graphql.service';
import { Shop } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './shop-layout.component.html',
    styleUrl: './shop-layout.component.scss',
})
export class ShopLayoutComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _shopService = inject(ShopGraphqlService);

    shop: Shop | null = null;
    loading = true;
    shopId!: number;

    navItems = [
        { label: 'Dashboard', route: 'dashboard', icon: 'heroicons_outline:home' },
        { label: 'Pages', route: 'pages', icon: 'heroicons_outline:document-text' },
        { label: 'Products', route: 'products', icon: 'heroicons_outline:cube' },
        { label: 'Order Forms', route: 'order-forms', icon: 'heroicons_outline:clipboard-document-list' },
        { label: 'Payments', route: 'payments', icon: 'heroicons_outline:credit-card' },
        { label: 'Members', route: 'members', icon: 'heroicons_outline:user-group' },
        { label: 'Sales', route: 'sales', icon: 'heroicons_outline:chart-bar' },
    ];

    ngOnInit(): void {
        this.shopId = Number(this._route.snapshot.paramMap.get('shopId'));
        this._shopService.getShop(this.shopId).subscribe({
            next: (shop) => {
                this.shop = shop;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load shop', err);
                this.loading = false;
            },
        });
    }
}
