import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderFormGraphqlService } from 'app/core/graphql/order-form.graphql.service';
import { OrderForm } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-order-forms',
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
            <h2 class="text-xl font-semibold">Order Forms</h2>
            <button mat-flat-button color="primary">
                <mat-icon [svgIcon]="'heroicons_outline:plus'" class="mr-2"></mat-icon>
                Create Form
            </button>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading && orderForms.length === 0) {
            <div class="text-center py-16">
                <mat-icon [svgIcon]="'heroicons_outline:clipboard-document-list'" class="icon-size-16 text-hint mb-4"></mat-icon>
                <p class="text-secondary text-lg">No order forms yet</p>
                <p class="text-secondary">Create an order form to collect customer information.</p>
            </div>
        }

        @if (!loading && orderForms.length > 0) {
            <div class="bg-card rounded-lg shadow overflow-hidden">
                <table mat-table [dataSource]="orderForms" class="w-full">
                    <!-- Name Column -->
                    <ng-container matColumnDef="name">
                        <th mat-header-cell *matHeaderCellDef>Form Name</th>
                        <td mat-cell *matCellDef="let form">
                            <div class="font-medium">{{ form.name }}</div>
                        </td>
                    </ng-container>

                    <!-- Fields Column -->
                    <ng-container matColumnDef="fields">
                        <th mat-header-cell *matHeaderCellDef>Fields</th>
                        <td mat-cell *matCellDef="let form">
                            {{ form.fields?.length || 0 }} fields
                        </td>
                    </ng-container>

                    <!-- Status Column -->
                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef>Status</th>
                        <td mat-cell *matCellDef="let form">
                            <span
                                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                [class.bg-green-100]="form.isActive"
                                [class.text-green-800]="form.isActive"
                                [class.bg-gray-100]="!form.isActive"
                                [class.text-gray-800]="!form.isActive"
                            >
                                {{ form.isActive ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let form">
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
export class ShopOrderFormsComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _orderFormService = inject(OrderFormGraphqlService);

    shopId!: number;
    orderForms: OrderForm[] = [];
    loading = true;
    displayedColumns = ['name', 'fields', 'status', 'actions'];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._orderFormService.getOrderForms(this.shopId).subscribe({
            next: (forms) => {
                this.orderForms = forms;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load order forms', err);
                this.loading = false;
            },
        });
    }
}
