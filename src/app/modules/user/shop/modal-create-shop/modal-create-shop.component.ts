import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-create-shop',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './modal-create-shop.component.html',
  styleUrl: './modal-create-shop.component.scss'
})
export class ModalCreateShopComponent implements OnInit {
  shopForm: UntypedFormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ModalCreateShopComponent>,
    private readonly _formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.shopForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: [''],
      banner: [''],
      is_active: [true]
    });
  }

  close(): void {
    this.matDialogRef.close();
  }

  saveAndClose(): void {
    if (this.shopForm.valid) {
      this.matDialogRef.close(this.shopForm.value);
    }
  }
}
