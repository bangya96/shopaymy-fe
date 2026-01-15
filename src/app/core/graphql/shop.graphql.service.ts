import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    SHOPS_QUERY,
    SHOP_QUERY,
} from './graphql.queries';
import {
    CREATE_SHOP_MUTATION,
    UPDATE_SHOP_MUTATION,
    DELETE_SHOP_MUTATION,
} from './graphql.mutations';
import {
    Shop,
    ShopsQueryResponse,
    ShopQueryResponse,
    CreateShopInput,
    UpdateShopInput,
    CreateShopMutationResponse,
    UpdateShopMutationResponse,
    DeleteShopMutationResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class ShopGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all shops for the current user
     */
    getShops(): Observable<Shop[]> {
        return this._apollo
            .watchQuery<ShopsQueryResponse>({
                query: SHOPS_QUERY,
            })
            .valueChanges.pipe(map((result) => result.data.shops));
    }

    /**
     * Get a single shop by ID
     */
    getShop(id: number): Observable<Shop> {
        return this._apollo
            .watchQuery<ShopQueryResponse>({
                query: SHOP_QUERY,
                variables: { id },
            })
            .valueChanges.pipe(map((result) => result.data.shop));
    }

    /**
     * Create a new shop
     */
    createShop(input: CreateShopInput): Observable<Shop> {
        return this._apollo
            .mutate<CreateShopMutationResponse>({
                mutation: CREATE_SHOP_MUTATION,
                variables: { input },
                refetchQueries: [{ query: SHOPS_QUERY }],
            })
            .pipe(map((result) => result.data!.createShop));
    }

    /**
     * Update an existing shop
     */
    updateShop(input: UpdateShopInput): Observable<Shop> {
        return this._apollo
            .mutate<UpdateShopMutationResponse>({
                mutation: UPDATE_SHOP_MUTATION,
                variables: { input },
                refetchQueries: [{ query: SHOPS_QUERY }],
            })
            .pipe(map((result) => result.data!.updateShop));
    }

    /**
     * Delete a shop
     */
    deleteShop(id: number): Observable<boolean> {
        return this._apollo
            .mutate<DeleteShopMutationResponse>({
                mutation: DELETE_SHOP_MUTATION,
                variables: { id },
                refetchQueries: [{ query: SHOPS_QUERY }],
            })
            .pipe(map((result) => result.data!.deleteShop));
    }
}
