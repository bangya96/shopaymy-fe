import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShopGraphqlService } from 'app/core/graphql/shop.graphql.service';
import { Shop } from 'app/core/graphql/graphql.types';
import { CreateShopDialogComponent } from './create-shop-dialog/create-shop-dialog.component';

@Component({
    selector: 'app-shops-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './shops-list.component.html',
    styleUrl: './shops-list.component.scss',
})
export class ShopsListComponent implements OnInit {
    private _shopService = inject(ShopGraphqlService);
    private _dialog = inject(MatDialog);

    shops: Shop[] = [];
    loading = true;

    ngOnInit(): void {
        this._shopService.getShops().subscribe({
            next: (shops) => {
                this.shops = shops;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load shops', err);
                this.loading = false;
            },
        });
    }

    openCreateShopDialog(): void {
        const dialogRef = this._dialog.open(CreateShopDialogComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._shopService.createShop(result).subscribe({
                    next: (shop) => {
                        console.log('Shop created:', shop);
                    },
                    error: (err) => {
                        console.error('Failed to create shop', err);
                    },
                });
            }
        });
    }
}
