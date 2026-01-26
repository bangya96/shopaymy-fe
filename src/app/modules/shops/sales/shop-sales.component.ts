import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { OrderGraphqlService } from 'app/core/graphql/order.graphql.service';
import { Order, ShopOrderStats } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-sales',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,
    ],
    template: `
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold">Sales & Orders</h2>
            <mat-form-field appearance="outline" class="w-40">
                <mat-label>Period</mat-label>
                <mat-select value="30">
                    <mat-option value="7">Last 7 days</mat-option>
                    <mat-option value="30">Last 30 days</mat-option>
                    <mat-option value="90">Last 90 days</mat-option>
                    <mat-option value="365">Last year</mat-option>
                </mat-select>
            </mat-form-field>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading) {
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <mat-card class="p-6">
                    <div class="flex items-center gap-4">
                        <div class="p-3 rounded-full bg-green-100 text-green-600">
                            <mat-icon [svgIcon]="'heroicons_outline:currency-dollar'"></mat-icon>
                        </div>
                        <div>
                            <p class="text-secondary text-sm">Total Revenue</p>
                            <p class="text-2xl font-bold">MYR {{ stats?.totalRevenue | number:'1.2-2' }}</p>
                        </div>
                    </div>
                </mat-card>

                <mat-card class="p-6">
                    <div class="flex items-center gap-4">
                        <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                            <mat-icon [svgIcon]="'heroicons_outline:shopping-cart'"></mat-icon>
                        </div>
                        <div>
                            <p class="text-secondary text-sm">Total Orders</p>
                            <p class="text-2xl font-bold">{{ stats?.totalOrders || 0 }}</p>
                        </div>
                    </div>
                </mat-card>

                <mat-card class="p-6">
                    <div class="flex items-center gap-4">
                        <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
                            <mat-icon [svgIcon]="'heroicons_outline:clock'"></mat-icon>
                        </div>
                        <div>
                            <p class="text-secondary text-sm">Pending</p>
                            <p class="text-2xl font-bold">{{ stats?.pendingOrders || 0 }}</p>
                        </div>
                    </div>
                </mat-card>

                <mat-card class="p-6">
                    <div class="flex items-center gap-4">
                        <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                            <mat-icon [svgIcon]="'heroicons_outline:check-circle'"></mat-icon>
                        </div>
                        <div>
                            <p class="text-secondary text-sm">Completed</p>
                            <p class="text-2xl font-bold">{{ stats?.paidOrders || 0 }}</p>
                        </div>
                    </div>
                </mat-card>
            </div>

            <!-- Recent Orders -->
            <h3 class="text-lg font-medium mb-4">Recent Orders</h3>
            @if (orders.length === 0) {
                <div class="text-center py-16 bg-card rounded-lg">
                    <mat-icon [svgIcon]="'heroicons_outline:shopping-cart'" class="icon-size-16 text-hint mb-4"></mat-icon>
                    <p class="text-secondary text-lg">No orders yet</p>
                    <p class="text-secondary">Orders will appear here when customers make purchases.</p>
                </div>
            } @else {
                <div class="bg-card rounded-lg shadow overflow-hidden">
                    <table mat-table [dataSource]="orders" class="w-full">
                        <!-- Order Number Column -->
                        <ng-container matColumnDef="orderNumber">
                            <th mat-header-cell *matHeaderCellDef>Order #</th>
                            <td mat-cell *matCellDef="let order">
                                <div class="font-medium">{{ order.orderNumber }}</div>
                            </td>
                        </ng-container>

                        <!-- Customer Column -->
                        <ng-container matColumnDef="customer">
                            <th mat-header-cell *matHeaderCellDef>Customer</th>
                            <td mat-cell *matCellDef="let order">
                                <div>{{ order.customerName }}</div>
                                <div class="text-secondary text-sm">{{ order.customerEmail }}</div>
                            </td>
                        </ng-container>

                        <!-- Amount Column -->
                        <ng-container matColumnDef="amount">
                            <th mat-header-cell *matHeaderCellDef>Amount</th>
                            <td mat-cell *matCellDef="let order">
                                {{ order.currency }} {{ order.amount | number:'1.2-2' }}
                            </td>
                        </ng-container>

                        <!-- Status Column -->
                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let order">
                                <span
                                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                    [class.bg-yellow-100]="order.status === 'pending' || order.status === 'awaiting_payment'"
                                    [class.text-yellow-800]="order.status === 'pending' || order.status === 'awaiting_payment'"
                                    [class.bg-green-100]="order.status === 'paid' || order.status === 'completed'"
                                    [class.text-green-800]="order.status === 'paid' || order.status === 'completed'"
                                    [class.bg-red-100]="order.status === 'failed' || order.status === 'refunded' || order.status === 'cancelled'"
                                    [class.text-red-800]="order.status === 'failed' || order.status === 'refunded' || order.status === 'cancelled'"
                                >
                                    {{ order.status | titlecase }}
                                </span>
                            </td>
                        </ng-container>

                        <!-- Date Column -->
                        <ng-container matColumnDef="createdAt">
                            <th mat-header-cell *matHeaderCellDef>Date</th>
                            <td mat-cell *matCellDef="let order">{{ order.createdAt | date:'short' }}</td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                </div>
            }
        }
    `,
})
export class ShopSalesComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _orderService = inject(OrderGraphqlService);

    shopId!: number;
    orders: Order[] = [];
    stats: ShopOrderStats | null = null;
    loading = true;
    displayedColumns = ['orderNumber', 'customer', 'amount', 'status', 'createdAt'];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._orderService.getShopOrdersWithStats(this.shopId).subscribe({
            next: ({ orders, stats }) => {
                this.orders = orders;
                this.stats = stats;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load orders', err);
                this.loading = false;
            },
        });
    }
}
