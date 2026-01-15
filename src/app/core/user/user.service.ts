import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from 'app/core/user/user.types';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { ME_QUERY } from '../graphql/graphql.queries';
import { MeQueryResponse, User as GraphQLUser } from '../graphql/graphql.types';

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly _apollo = inject(Apollo);
    private readonly _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User | GraphQLUser) {
        // Convert GraphQL user to local User type if needed
        const localUser: User = {
            id: String(value.id),
            name: value.name,
            email: value.email,
        };
        // Store the value
        this._user.next(localUser);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data using GraphQL
     */
    get(): Observable<User> {
        return this._apollo
            .query<MeQueryResponse>({
                query: ME_QUERY,
                fetchPolicy: 'network-only',
            })
            .pipe(
                map((result) => {
                    const graphqlUser = result.data.me;
                    const user: User = {
                        id: String(graphqlUser.id),
                        name: graphqlUser.name,
                        email: graphqlUser.email,
                    };
                    return user;
                }),
                tap((user) => {
                    this._user.next(user);
                })
            );
    }

    /**
     * Update the user
     * Note: Update mutation not available in GraphQL yet
     *
     * @param user
     */
    update(user: User): Observable<any> {
        // TODO: Implement when GraphQL mutation is available
        // For now, just update local state
        this._user.next(user);
        return new Observable((observer) => {
            observer.next(user);
            observer.complete();
        });
    }
}
