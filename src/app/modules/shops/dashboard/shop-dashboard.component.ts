import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-shop-dashboard',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatCardModule],
    template: `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Quick stats cards -->
            <mat-card class="p-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                        <mat-icon [svgIcon]="'heroicons_outline:document-text'"></mat-icon>
                    </div>
                    <div>
                        <p class="text-secondary text-sm">Pages</p>
                        <p class="text-2xl font-bold">--</p>
                    </div>
                </div>
            </mat-card>

            <mat-card class="p-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 rounded-full bg-green-100 text-green-600">
                        <mat-icon [svgIcon]="'heroicons_outline:cube'"></mat-icon>
                    </div>
                    <div>
                        <p class="text-secondary text-sm">Products</p>
                        <p class="text-2xl font-bold">--</p>
                    </div>
                </div>
            </mat-card>

            <mat-card class="p-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <mat-icon [svgIcon]="'heroicons_outline:shopping-cart'"></mat-icon>
                    </div>
                    <div>
                        <p class="text-secondary text-sm">Orders</p>
                        <p class="text-2xl font-bold">--</p>
                    </div>
                </div>
            </mat-card>

            <mat-card class="p-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                        <mat-icon [svgIcon]="'heroicons_outline:currency-dollar'"></mat-icon>
                    </div>
                    <div>
                        <p class="text-secondary text-sm">Revenue</p>
                        <p class="text-2xl font-bold">MYR --</p>
                    </div>
                </div>
            </mat-card>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <mat-card class="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3">
                        <mat-icon [svgIcon]="'heroicons_outline:plus'" class="text-primary"></mat-icon>
                        <span>Create New Page</span>
                    </div>
                </mat-card>
                <mat-card class="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3">
                        <mat-icon [svgIcon]="'heroicons_outline:plus'" class="text-primary"></mat-icon>
                        <span>Add Product</span>
                    </div>
                </mat-card>
                <mat-card class="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                    <div class="flex items-center gap-3">
                        <mat-icon [svgIcon]="'heroicons_outline:user-plus'" class="text-primary"></mat-icon>
                        <span>Invite Member</span>
                    </div>
                </mat-card>
            </div>
        </div>
    `,
})
export class ShopDashboardComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    shopId!: number;

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
    }
}
