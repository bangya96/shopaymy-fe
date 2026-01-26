import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    ORDER_FORMS_QUERY,
    ORDER_FORM_QUERY,
} from './graphql.queries';
import {
    CREATE_ORDER_FORM_MUTATION,
    UPDATE_ORDER_FORM_MUTATION,
    DELETE_ORDER_FORM_MUTATION,
} from './graphql.mutations';
import {
    OrderForm,
    OrderFormsQueryResponse,
    OrderFormQueryResponse,
    CreateOrderFormInput,
    UpdateOrderFormInput,
    CreateOrderFormMutationResponse,
    UpdateOrderFormMutationResponse,
    DeleteOrderFormMutationResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class OrderFormGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all order forms for a specific shop
     */
    getOrderForms(shopId: number): Observable<OrderForm[]> {
        return this._apollo
            .watchQuery<OrderFormsQueryResponse>({
                query: ORDER_FORMS_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.orderForms as OrderForm[]));
    }

    /**
     * Get a single order form by ID
     */
    getOrderForm(id: number): Observable<OrderForm> {
        return this._apollo
            .watchQuery<OrderFormQueryResponse>({
                query: ORDER_FORM_QUERY,
                variables: { id },
            })
            .valueChanges.pipe(map((result) => result.data.orderForm as OrderForm));
    }

    /**
     * Create a new order form
     */
    createOrderForm(input: CreateOrderFormInput): Observable<OrderForm> {
        return this._apollo
            .mutate<CreateOrderFormMutationResponse>({
                mutation: CREATE_ORDER_FORM_MUTATION,
                variables: { input },
                refetchQueries: [
                    { query: ORDER_FORMS_QUERY, variables: { shopId: input.shopId } },
                ],
            })
            .pipe(map((result) => result.data!.createOrderForm));
    }

    /**
     * Update an existing order form
     */
    updateOrderForm(input: UpdateOrderFormInput, shopId: number): Observable<OrderForm> {
        return this._apollo
            .mutate<UpdateOrderFormMutationResponse>({
                mutation: UPDATE_ORDER_FORM_MUTATION,
                variables: { input },
                refetchQueries: [
                    { query: ORDER_FORMS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.updateOrderForm));
    }

    /**
     * Delete an order form
     */
    deleteOrderForm(id: number, shopId: number): Observable<boolean> {
        return this._apollo
            .mutate<DeleteOrderFormMutationResponse>({
                mutation: DELETE_ORDER_FORM_MUTATION,
                variables: { id },
                refetchQueries: [
                    { query: ORDER_FORMS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.deleteOrderForm));
    }
}
