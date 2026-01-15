import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError, map } from 'rxjs';
import {
    LOGIN_MUTATION,
    REGISTER_MUTATION,
    LOGOUT_MUTATION,
} from '../graphql/graphql.mutations';
import { ME_QUERY } from '../graphql/graphql.queries';
import {
    LoginInput,
    RegisterInput,
    LoginMutationResponse,
    RegisterMutationResponse,
    LogoutMutationResponse,
    MeQueryResponse,
    AuthResponse,
} from '../graphql/graphql.types';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private readonly _apollo = inject(Apollo);
    private readonly _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     * Note: This endpoint might not be available in GraphQL yet
     */
    forgotPassword(email: string): Observable<any> {
        // TODO: Implement when GraphQL mutation is available
        return throwError(() => new Error('Forgot password not implemented in GraphQL'));
    }

    /**
     * Reset password
     * Note: This endpoint might not be available in GraphQL yet
     */
    resetPassword(password: string): Observable<any> {
        // TODO: Implement when GraphQL mutation is available
        return throwError(() => new Error('Reset password not implemented in GraphQL'));
    }

    /**
     * Sign in using GraphQL
     *
     * @param credentials
     */
    signIn(credentials: LoginInput): Observable<AuthResponse> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError(() => new Error('User is already logged in.'));
        }

        return this._apollo
            .mutate<LoginMutationResponse>({
                mutation: LOGIN_MUTATION,
                variables: {
                    input: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                },
            })
            .pipe(
                map((result) => {
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                    return result.data.login;
                }),
                switchMap((response: AuthResponse) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return the response
                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token (via GraphQL me query)
     */
    signInUsingToken(): Observable<boolean> {
        // Sign in using the token
        return this._apollo
            .query<MeQueryResponse>({
                query: ME_QUERY,
                fetchPolicy: 'network-only',
            })
            .pipe(
                catchError(() => of(null)),
                switchMap((result) => {
                    // If no result or errors, return false
                    if (!result || result.error || !result.data) {
                        this._authenticated = false;
                        return of(false);
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = result.data.me;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out using GraphQL
     */
    signOut(): Observable<any> {
        return this._apollo
            .mutate<LogoutMutationResponse>({
                mutation: LOGOUT_MUTATION,
            })
            .pipe(
                catchError(() => of(null)),
                switchMap(() => {
                    // Remove the access token from the local storage
                    localStorage.removeItem('accessToken');

                    // Set the authenticated flag to false
                    this._authenticated = false;

                    // Clear Apollo cache
                    this._apollo.client.clearStore();

                    return of(true);
                })
            );
    }

    /**
     * Sign up using GraphQL
     *
     * @param user
     */
    signUp(user: RegisterInput): Observable<AuthResponse> {
        return this._apollo
            .mutate<RegisterMutationResponse>({
                mutation: REGISTER_MUTATION,
                variables: {
                    input: {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    },
                },
            })
            .pipe(
                map((result) => {
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                    return result.data.register;
                }),
                switchMap((response: AuthResponse) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return the response
                    return of(response);
                })
            );
    }

    /**
     * Unlock session
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this.signIn(credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check if the access token is expired
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and is valid, try to get the user
        return this.signInUsingToken();
    }
}
