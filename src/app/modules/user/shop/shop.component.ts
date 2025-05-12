import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateShopComponent } from './modal-create-shop/modal-create-shop.component';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  shops: Shop[] = [];

  constructor(private readonly _matDialog: MatDialog) {}

  openComposeDialog(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(ModalCreateShopComponent);

    dialogRef.afterClosed().subscribe((result) => {
        console.log('Compose dialog was closed!');
    });
}

}

interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

