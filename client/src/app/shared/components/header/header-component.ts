import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Flame, LucideAngularModule, Power, Search, Text } from 'lucide-angular';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header-component.html',
  standalone: true,
})
export class HeaderComponent {
  // Lucide Icons >>
  Search = Search;
  Text = Text;
  Flame = Flame;
  Power = Power;
  // Lucide Icons <<

  constructor(private tokenStorageService: TokenStorageService) { }

  logout(): void {
    this.tokenStorageService.signOut();
    location.reload();
  }
}
