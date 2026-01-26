import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, forkJoin } from 'rxjs';
import {
    SHOP_MEMBERS_QUERY,
    SHOP_INVITATIONS_QUERY,
} from './graphql.queries';
import {
    INVITE_TO_SHOP_MUTATION,
    CANCEL_INVITATION_MUTATION,
} from './graphql.mutations';
import {
    ShopMember,
    ShopInvitation,
    ShopMembersQueryResponse,
    ShopInvitationsQueryResponse,
    ShopRole,
    InviteToShopMutationResponse,
    CancelInvitationMutationResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class ShopMemberGraphqlService {
    private _apollo = inject(Apollo);

    /**
     * Get all members and pending invitations for a specific shop
     */
    getShopMembers(shopId: number): Observable<{ members: ShopMember[]; invitations: ShopInvitation[] }> {
        return forkJoin({
            members: this._apollo
                .query<ShopMembersQueryResponse>({
                    query: SHOP_MEMBERS_QUERY,
                    variables: { shopId },
                })
                .pipe(map((result) => result.data.shopMembers)),
            invitations: this._apollo
                .query<ShopInvitationsQueryResponse>({
                    query: SHOP_INVITATIONS_QUERY,
                    variables: { shopId },
                })
                .pipe(map((result) => result.data.shopInvitations)),
        });
    }

    /**
     * Invite a user to a shop
     */
    inviteToShop(shopId: number, email: string, role: ShopRole): Observable<ShopInvitation> {
        return this._apollo
            .mutate<InviteToShopMutationResponse>({
                mutation: INVITE_TO_SHOP_MUTATION,
                variables: { input: { shopId, email, role } },
                refetchQueries: [
                    { query: SHOP_INVITATIONS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.inviteToShop));
    }

    /**
     * Cancel a pending invitation
     */
    cancelInvitation(id: number, shopId: number): Observable<boolean> {
        return this._apollo
            .mutate<CancelInvitationMutationResponse>({
                mutation: CANCEL_INVITATION_MUTATION,
                variables: { id },
                refetchQueries: [
                    { query: SHOP_INVITATIONS_QUERY, variables: { shopId } },
                ],
            })
            .pipe(map((result) => result.data!.cancelInvitation));
    }
}
