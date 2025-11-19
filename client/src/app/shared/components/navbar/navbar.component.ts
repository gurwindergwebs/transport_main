import { Component, EventEmitter, Output, Input, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, Search, Moon, Sun, Bell, User, Settings, CreditCard, LogOut } from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  @Input() isSidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  themeService = inject(ThemeService);

  // Lucide icons
  readonly Menu = Menu;
  readonly Search = Search;
  readonly Moon = Moon;
  readonly Sun = Sun;
  readonly Bell = Bell;
  readonly User = User;
  readonly Settings = Settings;
  readonly CreditCard = CreditCard;
  readonly LogOut = LogOut;

  showNotifications = false;
  showProfileMenu = false;

  notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment confirmed', time: '1 hour ago', unread: true },
    { id: 3, title: 'New user registered', time: '2 hours ago', unread: false }
  ];

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfileMenu = false;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
  }

  closeDropdowns() {
    this.showNotifications = false;
    this.showProfileMenu = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
