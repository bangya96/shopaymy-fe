import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-create-shop-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    template: `
        <h2 mat-dialog-title>Create New Shop</h2>
        <mat-dialog-content>
            <form [formGroup]="form" class="flex flex-col gap-4">
                <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Shop Name</mat-label>
                    <input matInput formControlName="name" placeholder="Enter shop name" />
                    @if (form.get('name')?.hasError('required')) {
                        <mat-error>Shop name is required</mat-error>
                    }
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Description</mat-label>
                    <textarea matInput formControlName="description" placeholder="Enter shop description" rows="3"></textarea>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Logo URL</mat-label>
                    <input matInput formControlName="logo" placeholder="https://example.com/logo.png" />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Banner URL</mat-label>
                    <input matInput formControlName="banner" placeholder="https://example.com/banner.png" />
                </mat-form-field>
            </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="submit()">
                Create Shop
            </button>
        </mat-dialog-actions>
    `,
})
export class CreateShopDialogComponent {
    private _fb = inject(FormBuilder);
    private _dialogRef = inject(MatDialogRef<CreateShopDialogComponent>);

    form: FormGroup = this._fb.group({
        name: ['', Validators.required],
        description: [''],
        logo: [''],
        banner: [''],
    });

    submit(): void {
        if (this.form.valid) {
            this._dialogRef.close(this.form.value);
        }
    }
}
