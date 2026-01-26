import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, forkJoin } from 'rxjs';
import {
    ORDERS_QUERY,
    SHOP_ORDER_STATS_QUERY,
} from './graphql.queries';
import {
    Order,
    ShopOrderStats,
    OrdersQueryResponse,
    ShopOrderStatsQueryResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class OrderGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all orders for a specific shop
     */
    getOrders(shopId: number): Observable<Order[]> {
        return this._apollo
            .watchQuery<OrdersQueryResponse>({
                query: ORDERS_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.orders as Order[]));
    }

    /**
     * Get order statistics for a specific shop
     */
    getShopOrderStats(shopId: number): Observable<ShopOrderStats> {
        return this._apollo
            .watchQuery<ShopOrderStatsQueryResponse>({
                query: SHOP_ORDER_STATS_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.shopOrderStats as ShopOrderStats));
    }

    /**
     * Get orders with stats for a specific shop
     */
    getShopOrdersWithStats(shopId: number): Observable<{ orders: Order[]; stats: ShopOrderStats }> {
        return forkJoin({
            orders: this._apollo
                .query<OrdersQueryResponse>({
                    query: ORDERS_QUERY,
                    variables: { shopId },
                })
                .pipe(map((result) => result.data.orders as Order[])),
            stats: this._apollo
                .query<ShopOrderStatsQueryResponse>({
                    query: SHOP_ORDER_STATS_QUERY,
                    variables: { shopId },
                })
                .pipe(map((result) => result.data.shopOrderStats as ShopOrderStats)),
        });
    }
}
