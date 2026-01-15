import { inject } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../../environments/environment';

export function apolloOptionsFactory() {
    const httpLink = inject(HttpLink);

    // Create the HTTP link
    const http = httpLink.create({
        uri: environment.graphqlUrl,
        withCredentials: true,
    });

    // Create the auth link to add the token to requests
    const authLink = new ApolloLink((operation, forward) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            operation.setContext({
                headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
            });
        }

        return forward(operation);
    });

    return {
        link: ApolloLink.from([authLink, http]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        shops: {
                            merge(existing, incoming) {
                                return incoming;
                            },
                        },
                        pages: {
                            merge(existing, incoming) {
                                return incoming;
                            },
                        },
                    },
                },
            },
        }),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network' as const,
                errorPolicy: 'all' as const,
            },
            query: {
                fetchPolicy: 'network-only' as const,
                errorPolicy: 'all' as const,
            },
            mutate: {
                errorPolicy: 'all' as const,
            },
        },
    };
}
