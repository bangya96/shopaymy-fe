import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
    PAGES_QUERY,
    PAGE_QUERY,
} from './graphql.queries';
import {
    CREATE_PAGE_MUTATION,
    UPDATE_PAGE_MUTATION,
    DELETE_PAGE_MUTATION,
} from './graphql.mutations';
import {
    Page,
    PagesQueryResponse,
    PageQueryResponse,
    CreatePageInput,
    UpdatePageInput,
    CreatePageMutationResponse,
    UpdatePageMutationResponse,
    DeletePageMutationResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class PageGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all pages for a specific shop
     */
    getPages(shopId: number): Observable<Page[]> {
        return this._apollo
            .watchQuery<PagesQueryResponse>({
                query: PAGES_QUERY,
                variables: { shopId },
            })
            .valueChanges.pipe(map((result) => result.data.pages as Page[]));
    }

    /**
     * Get a single page by ID
     */
    getPage(id: number): Observable<Page> {
        return this._apollo
            .watchQuery<PageQueryResponse>({
                query: PAGE_QUERY,
                variables: { id },
            })
            .valueChanges.pipe(map((result) => result.data.page as Page));
    }

    /**
     * Create a new page
     */
    createPage(input: CreatePageInput): Observable<Page> {
        return this._apollo
            .mutate<CreatePageMutationResponse>({
                mutation: CREATE_PAGE_MUTATION,
                variables: { input },
                refetchQueries: [
                    {
                        query: PAGES_QUERY,
                        variables: { shopId: input.shopId },
                    },
                ],
            })
            .pipe(map((result) => result.data!.createPage));
    }

    /**
     * Update an existing page
     */
    updatePage(input: UpdatePageInput, shopId: number): Observable<Page> {
        return this._apollo
            .mutate<UpdatePageMutationResponse>({
                mutation: UPDATE_PAGE_MUTATION,
                variables: { input },
                refetchQueries: [
                    {
                        query: PAGES_QUERY,
                        variables: { shopId },
                    },
                ],
            })
            .pipe(map((result) => result.data!.updatePage));
    }

    /**
     * Delete a page
     */
    deletePage(id: number, shopId: number): Observable<boolean> {
        return this._apollo
            .mutate<DeletePageMutationResponse>({
                mutation: DELETE_PAGE_MUTATION,
                variables: { id },
                refetchQueries: [
                    {
                        query: PAGES_QUERY,
                        variables: { shopId },
                    },
                ],
            })
            .pipe(map((result) => result.data!.deletePage));
    }
}
