import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageGraphqlService } from 'app/core/graphql/page.graphql.service';
import { Page } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-pages',
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
            <h2 class="text-xl font-semibold">Sales Pages</h2>
            <button mat-flat-button color="primary">
                <mat-icon [svgIcon]="'heroicons_outline:plus'" class="mr-2"></mat-icon>
                Create Page
            </button>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading && pages.length === 0) {
            <div class="text-center py-16">
                <mat-icon [svgIcon]="'heroicons_outline:document-text'" class="icon-size-16 text-hint mb-4"></mat-icon>
                <p class="text-secondary text-lg">No pages yet</p>
                <p class="text-secondary">Create your first sales page to get started.</p>
            </div>
        }

        @if (!loading && pages.length > 0) {
            <div class="bg-card rounded-lg shadow overflow-hidden">
                <table mat-table [dataSource]="pages" class="w-full">
                    <!-- Title Column -->
                    <ng-container matColumnDef="title">
                        <th mat-header-cell *matHeaderCellDef>Title</th>
                        <td mat-cell *matCellDef="let page">
                            <div class="font-medium">{{ page.title }}</div>
                            <div class="text-secondary text-sm">{{ page.slug }}</div>
                        </td>
                    </ng-container>

                    <!-- Status Column -->
                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef>Status</th>
                        <td mat-cell *matCellDef="let page">
                            <span
                                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                [class.bg-green-100]="page.isActive"
                                [class.text-green-800]="page.isActive"
                                [class.bg-gray-100]="!page.isActive"
                                [class.text-gray-800]="!page.isActive"
                            >
                                {{ page.isActive ? 'Published' : 'Draft' }}
                            </span>
                        </td>
                    </ng-container>

                    <!-- Created Column -->
                    <ng-container matColumnDef="createdAt">
                        <th mat-header-cell *matHeaderCellDef>Created</th>
                        <td mat-cell *matCellDef="let page">{{ page.createdAt | date:'short' }}</td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td mat-cell *matCellDef="let page">
                            <button mat-icon-button [matMenuTriggerFor]="menu">
                                <mat-icon [svgIcon]="'heroicons_outline:ellipsis-vertical'"></mat-icon>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item>
                                    <mat-icon [svgIcon]="'heroicons_outline:pencil'"></mat-icon>
                                    <span>Edit</span>
                                </button>
                                <button mat-menu-item>
                                    <mat-icon [svgIcon]="'heroicons_outline:eye'"></mat-icon>
                                    <span>Preview</span>
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
export class ShopPagesComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _pageService = inject(PageGraphqlService);

    shopId!: number;
    pages: Page[] = [];
    loading = true;
    displayedColumns = ['title', 'status', 'createdAt', 'actions'];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._pageService.getPages(this.shopId).subscribe({
            next: (pages) => {
                this.pages = pages;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load pages', err);
                this.loading = false;
            },
        });
    }
}
