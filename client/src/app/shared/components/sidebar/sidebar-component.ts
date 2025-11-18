import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flame, FolderKanban, House, LucideAngularModule, ScanBarcode, Search, Sheet, ShoppingCart, TabletSmartphone, Text } from 'lucide-angular';

@Component({
  selector: 'app-sidebar-component',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './sidebar-component.html',
  standalone: true,
})
export class SidebarComponent {
  // Lucide Icons >>
  Search = Search;
  Text = Text;
  Flame = Flame;
  House = House;
  Sheet = Sheet;
  TabletSmartphone = TabletSmartphone;
  ShoppingCart = ShoppingCart;
  FolderKanban = FolderKanban;
  ScanBarcode = ScanBarcode;
  // Lucide Icons <<
}
