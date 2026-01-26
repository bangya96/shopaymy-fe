import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    PAYMENT_GATEWAY_SETTINGS_QUERY,
} from './graphql.queries';
import {
    SAVE_PAYMENT_GATEWAY_SETTINGS_MUTATION,
} from './graphql.mutations';
import {
    PaymentGatewaySettings,
    PaymentGatewaySettingsQueryResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class PaymentGatewayGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get payment gateway settings for a specific shop
     */
    getPaymentGatewaySettings(shopId: number): Observable<PaymentGatewaySettings[]> {
        return this._apollo
            .watchQuery<PaymentGatewaySettingsQueryResponse>({
                query: PAYMENT_GATEWAY_SETTINGS_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.paymentGatewaySettings as PaymentGatewaySettings[]));
    }

    /**
     * Save payment gateway settings
     */
    savePaymentGatewaySettings(input: {
        shopId: number;
        gateway: string;
        isActive: boolean;
        isSandbox: boolean;
        credentials: Record<string, any>;
    }): Observable<PaymentGatewaySettings> {
        return this._apollo
            .mutate<{ savePaymentGatewaySettings: PaymentGatewaySettings }>({
                mutation: SAVE_PAYMENT_GATEWAY_SETTINGS_MUTATION,
                variables: { input },
                refetchQueries: [
                    { query: PAYMENT_GATEWAY_SETTINGS_QUERY, variables: { shopId: input.shopId } },
                ],
            })
            .pipe(map((result) => result.data!.savePaymentGatewaySettings));
    }
}
