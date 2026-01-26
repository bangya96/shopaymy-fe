import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductGraphqlService } from 'app/core/graphql/product.graphql.service';
import { Product } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-products',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold">Products</h2>
            <button mat-flat-button color="primary">
                <mat-icon [svgIcon]="'heroicons_outline:plus'" class="mr-2"></mat-icon>
                Add Product
            </button>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading && products.length === 0) {
            <div class="text-center py-16">
                <mat-icon [svgIcon]="'heroicons_outline:cube'" class="icon-size-16 text-hint mb-4"></mat-icon>
                <p class="text-secondary text-lg">No products yet</p>
                <p class="text-secondary">Add your first product to start selling.</p>
            </div>
        }

        @if (!loading && products.length > 0) {
            <div class="bg-card rounded-lg shadow overflow-hidden">
                <table mat-table [dataSource]="products" class="w-full">
                    <!-- Name Column -->
                    <ng-container matColumnDef="name">
                        <th mat-header-cell *matHeaderCellDef>Product</th>
                        <td mat-cell *matCellDef="let product">
                            <div class="flex items-center gap-3">
                                @if (product.images?.length) {
                                    <img [src]="product.images[0]" class="w-10 h-10 rounded object-cover" />
                                } @else {
                                    <div class="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                                        <mat-icon [svgIcon]="'heroicons_outline:photo'" class="text-gray-400"></mat-icon>
                                    </div>
                                }
                                <div>
                                    <div class="font-medium">{{ product.name }}</div>
                                    <div class="text-secondary text-sm">{{ product.sku || 'No SKU' }}</div>
                                </div>
                            </div>
                        </td>
                    </ng-container>

                    <!-- Price Column -->
                    <ng-container matColumnDef="price">
                        <th mat-header-cell *matHeaderCellDef>Price</th>
                        <td mat-cell *matCellDef="let product">
                            {{ product.currency }} {{ product.price | number:'1.2-2' }}
                        </td>
                    </ng-container>

                    <!-- Status Column -->
                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef>Status</th>
                        <td mat-cell *matCellDef="let product">
                            <span
                                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                [class.bg-green-100]="product.isActive"
                                [class.text-green-800]="product.isActive"
                                [class.bg-gray-100]="!product.isActive"
                                [class.text-gray-800]="!product.isActive"
                            >
                                {{ product.isActive ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let product">
                            <button mat-icon-button [matMenuTriggerFor]="menu">
                                <mat-icon [svgIcon]="'heroicons_outline:ellipsis-vertical'"></mat-icon>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>
                                    <mat-icon [svgIcon]="'heroicons_outline:pencil'"></mat-icon>
                                    <span>Edit</span>
                                </button>
                                <button mat-menu-item class="text-warn">
                                    <mat-icon [svgIcon]="'heroicons_outline:trash'"></mat-icon>
                                    <span>Delete</span>
                                </button>
                            </mat-menu>
                        </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>
            </div>
        }
    `,
})
export class ShopProductsComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _productService = inject(ProductGraphqlService);

    shopId!: number;
    products: Product[] = [];
    loading = true;
    displayedColumns = ['name', 'price', 'status', 'actions'];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._productService.getProducts(this.shopId).subscribe({
            next: (products) => {
                this.products = products;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load products', err);
                this.loading = false;
            },
        });
    }
}
