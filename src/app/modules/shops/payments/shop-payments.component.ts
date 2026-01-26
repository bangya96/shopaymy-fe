import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentGatewayGraphqlService } from 'app/core/graphql/payment-gateway.graphql.service';
import { PaymentGatewaySettings } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-payments',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold">Payment Gateways</h2>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading) {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                @for (gateway of availableGateways; track gateway.id) {
                    <mat-card class="p-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <img [src]="gateway.logo" [alt]="gateway.name" class="w-12 h-12 object-contain" />
                                <div>
                                    <h3 class="font-semibold text-lg">{{ gateway.name }}</h3>
                                    <p class="text-secondary text-sm">{{ gateway.description }}</p>
                                </div>
                            </div>
                            <mat-slide-toggle
                                [checked]="isGatewayEnabled(gateway.id)"
                                (change)="toggleGateway(gateway.id, $event.checked)"
                            ></mat-slide-toggle>
                        </div>
                        @if (isGatewayEnabled(gateway.id)) {
                            <div class="mt-4 pt-4 border-t">
                                <button mat-stroked-button color="primary" (click)="configureGateway(gateway.id)">
                                    <mat-icon [svgIcon]="'heroicons_outline:cog-6-tooth'" class="mr-2"></mat-icon>
                                    Configure
                                </button>
                            </div>
                        }
                    </mat-card>
                }
            </div>
        }
    `,
})
export class ShopPaymentsComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _paymentService = inject(PaymentGatewayGraphqlService);

    shopId!: number;
    settings: PaymentGatewaySettings[] = [];
    loading = true;

    availableGateways = [
        { id: 'billplz', name: 'Billplz', description: 'Malaysian payment gateway', logo: '/images/gateways/billplz.png' },
        { id: 'toyyibpay', name: 'ToyyibPay', description: 'Easy online payment collection', logo: '/images/gateways/toyyibpay.png' },
        { id: 'senangpay', name: 'SenangPay', description: 'Simple payment solution', logo: '/images/gateways/senangpay.png' },
        { id: 'chipin', name: 'Chip-in.asia', description: 'Payment gateway for Asia', logo: '/images/gateways/chipin.png' },
    ];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._paymentService.getPaymentGatewaySettings(this.shopId).subscribe({
            next: (settings) => {
                this.settings = settings;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load payment settings', err);
                this.loading = false;
            },
        });
    }

    isGatewayEnabled(gatewayId: string): boolean {
        return this.settings.some(s => s.gateway === gatewayId && s.isActive);
    }

    toggleGateway(gatewayId: string, enabled: boolean): void {
        console.log('Toggle gateway', gatewayId, enabled);
        // TODO: Implement toggle
    }

    configureGateway(gatewayId: string): void {
        console.log('Configure gateway', gatewayId);
        // TODO: Open configuration dialog
    }
}
