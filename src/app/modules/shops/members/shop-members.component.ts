import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ShopMemberGraphqlService } from 'app/core/graphql/shop-member.graphql.service';
import { ShopMember, ShopInvitation } from 'app/core/graphql/graphql.types';

@Component({
    selector: 'app-shop-members',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatChipsModule,
    ],
    template: `
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold">Team Members</h2>
            <button mat-flat-button color="primary">
                <mat-icon [svgIcon]="'heroicons_outline:user-plus'" class="mr-2"></mat-icon>
                Invite Member
            </button>
        </div>

        @if (loading) {
            <div class="flex justify-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
            </div>
        }

        @if (!loading) {
            <!-- Current Members -->
            <div class="mb-8">
                <h3 class="text-lg font-medium mb-4">Members ({{ members.length }})</h3>
                @if (members.length === 0) {
                    <div class="text-center py-8 bg-card rounded-lg">
                        <mat-icon [svgIcon]="'heroicons_outline:user-group'" class="icon-size-12 text-hint mb-2"></mat-icon>
                        <p class="text-secondary">No team members yet</p>
                    </div>
                } @else {
                    <div class="bg-card rounded-lg shadow overflow-hidden">
                        <table mat-table [dataSource]="members" class="w-full">
                            <!-- User Column -->
                            <ng-container matColumnDef="user">
                                <th mat-header-cell *matHeaderCellDef>Member</th>
                                <td mat-cell *matCellDef="let member">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary font-medium">
                                            {{ member.user?.name?.charAt(0) || '?' }}
                                        </div>
                                        <div>
                                            <div class="font-medium">{{ member.user?.name }}</div>
                                            <div class="text-secondary text-sm">{{ member.user?.email }}</div>
                                        </div>
                                    </div>
                                </td>
                            </ng-container>

                            <!-- Role Column -->
                            <ng-container matColumnDef="role">
                                <th mat-header-cell *matHeaderCellDef>Role</th>
                                <td mat-cell *matCellDef="let member">
                                    <span
                                        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                        [class.bg-purple-100]="member.role === 'owner'"
                                        [class.text-purple-800]="member.role === 'owner'"
                                        [class.bg-blue-100]="member.role === 'admin'"
                                        [class.text-blue-800]="member.role === 'admin'"
                                        [class.bg-gray-100]="member.role === 'staff'"
                                        [class.text-gray-800]="member.role === 'staff'"
                                    >
                                        {{ member.role | titlecase }}
                                    </span>
                                </td>
                            </ng-container>

                            <!-- Actions Column -->
                            <ng-container matColumnDef="actions">
                                <th mat-header-cell *matHeaderCellDef></th>
                                <td mat-cell *matCellDef="let member">
                                    @if (member.role !== 'owner') {
                                        <button mat-icon-button [matMenuTriggerFor]="menu">
                                            <mat-icon [svgIcon]="'heroicons_outline:ellipsis-vertical'"></mat-icon>
                                        </button>
                                        <mat-menu #menu="matMenu">
                                            <button mat-menu-item>
                                                <mat-icon [svgIcon]="'heroicons_outline:pencil'"></mat-icon>
                                                <span>Change Role</span>
                                            </button>
                                            <button mat-menu-item class="text-warn">
                                                <mat-icon [svgIcon]="'heroicons_outline:trash'"></mat-icon>
                                                <span>Remove</span>
                                            </button>
                                        </mat-menu>
                                    }
                                </td>
                            </ng-container>

                            <tr mat-header-row *matHeaderRowDef="memberColumns"></tr>
                            <tr mat-row *matRowDef="let row; columns: memberColumns;"></tr>
                        </table>
                    </div>
                }
            </div>

            <!-- Pending Invitations -->
            @if (invitations.length > 0) {
                <div>
                    <h3 class="text-lg font-medium mb-4">Pending Invitations ({{ invitations.length }})</h3>
                    <div class="bg-card rounded-lg shadow overflow-hidden">
                        <table mat-table [dataSource]="invitations" class="w-full">
                            <!-- Email Column -->
                            <ng-container matColumnDef="email">
                                <th mat-header-cell *matHeaderCellDef>Email</th>
                                <td mat-cell *matCellDef="let invite">{{ invite.email }}</td>
                            </ng-container>

                            <!-- Role Column -->
                            <ng-container matColumnDef="role">
                                <th mat-header-cell *matHeaderCellDef>Role</th>
                                <td mat-cell *matCellDef="let invite">{{ invite.role | titlecase }}</td>
                            </ng-container>

                            <!-- Status Column -->
                            <ng-container matColumnDef="status">
                                <th mat-header-cell *matHeaderCellDef>Status</th>
                                <td mat-cell *matCellDef="let invite">
                                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {{ invite.status | titlecase }}
                                    </span>
                                </td>
                            </ng-container>

                            <!-- Actions Column -->
                            <ng-container matColumnDef="actions">
                                <th mat-header-cell *matHeaderCellDef></th>
                                <td mat-cell *matCellDef="let invite">
                                    <button mat-icon-button color="warn" (click)="cancelInvitation(invite.id)">
                                        <mat-icon [svgIcon]="'heroicons_outline:x-mark'"></mat-icon>
                                    </button>
                                </td>
                            </ng-container>

                            <tr mat-header-row *matHeaderRowDef="inviteColumns"></tr>
                            <tr mat-row *matRowDef="let row; columns: inviteColumns;"></tr>
                        </table>
                    </div>
                </div>
            }
        }
    `,
})
export class ShopMembersComponent implements OnInit {
    private _route = inject(ActivatedRoute);
    private _memberService = inject(ShopMemberGraphqlService);

    shopId!: number;
    members: ShopMember[] = [];
    invitations: ShopInvitation[] = [];
    loading = true;
    memberColumns = ['user', 'role', 'actions'];
    inviteColumns = ['email', 'role', 'status', 'actions'];

    ngOnInit(): void {
        this.shopId = Number(this._route.parent?.snapshot.paramMap.get('shopId'));
        this._memberService.getShopMembers(this.shopId).subscribe({
            next: ({ members, invitations }) => {
                this.members = members;
                this.invitations = invitations;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load members', err);
                this.loading = false;
            },
        });
    }

    cancelInvitation(invitationId: number): void {
        console.log('Cancel invitation', invitationId);
        // TODO: Implement cancel
    }
}
