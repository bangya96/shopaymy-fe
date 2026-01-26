import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    PRODUCTS_QUERY,
    PRODUCT_QUERY,
} from './graphql.queries';
import {
    CREATE_PRODUCT_MUTATION,
    UPDATE_PRODUCT_MUTATION,
    DELETE_PRODUCT_MUTATION,
} from './graphql.mutations';
import {
    Product,
    ProductsQueryResponse,
    ProductQueryResponse,
    CreateProductInput,
    UpdateProductInput,
    CreateProductMutationResponse,
    UpdateProductMutationResponse,
    DeleteProductMutationResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class ProductGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all products for a specific shop
     */
    getProducts(shopId: number): Observable<Product[]> {
        return this._apollo
            .watchQuery<ProductsQueryResponse>({
                query: PRODUCTS_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.products as Product[]));
    }

    /**
     * Get a single product by ID
     */
    getProduct(id: number): Observable<Product> {
        return this._apollo
            .watchQuery<ProductQueryResponse>({
                query: PRODUCT_QUERY,
                variables: { id },
            })
            .valueChanges.pipe(map((result) => result.data.product as Product));
    }

    /**
     * Create a new product
     */
    createProduct(input: CreateProductInput): Observable<Product> {
        return this._apollo
            .mutate<CreateProductMutationResponse>({
                mutation: CREATE_PRODUCT_MUTATION,
                variables: { input },
                refetchQueries: [
                    { query: PRODUCTS_QUERY, variables: { shopId: input.shopId } },
                ],
            })
            .pipe(map((result) => result.data!.createProduct));
    }

    /**
     * Update an existing product
     */
    updateProduct(input: UpdateProductInput, shopId: number): Observable<Product> {
        return this._apollo
            .mutate<UpdateProductMutationResponse>({
                mutation: UPDATE_PRODUCT_MUTATION,
                variables: { input },
                refetchQueries: [
                    { query: PRODUCTS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.updateProduct));
    }

    /**
     * Delete a product
     */
    deleteProduct(id: number, shopId: number): Observable<boolean> {
        return this._apollo
            .mutate<DeleteProductMutationResponse>({
                mutation: DELETE_PRODUCT_MUTATION,
                variables: { id },
                refetchQueries: [
                    { query: PRODUCTS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.deleteProduct));
    }
}
