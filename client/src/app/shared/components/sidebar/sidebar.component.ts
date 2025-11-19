import { Component, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, CreditCard, Users, Package, Table, FileText, MessageSquare, UsersRound, Image, Bell, BarChart3, Calendar, TrendingUp, Settings } from 'lucide-angular';

interface MenuItem {
  icon: any;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Lucide icons
  readonly LayoutDashboard = LayoutDashboard;
  readonly CreditCard = CreditCard;
  readonly Users = Users;
  readonly Package = Package;
  readonly Table = Table;
  readonly FileText = FileText;
  readonly MessageSquare = MessageSquare;
  readonly UsersRound = UsersRound;
  readonly Image = Image;
  readonly Bell = Bell;
  readonly BarChart3 = BarChart3;
  readonly Calendar = Calendar;
  readonly TrendingUp = TrendingUp;
  readonly Settings = Settings;

  menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard', active: true },
    { icon: CreditCard, label: 'Transactions', route: '/transactions', active: false },
    { icon: Users, label: 'Customers', route: '/customers', active: false },
    { icon: Package, label: 'Products', route: '/products', active: false },
    { icon: Table, label: 'Tables', route: '/tables', active: false },
    { icon: FileText, label: 'Blog', route: '/blog', active: false },
    { icon: MessageSquare, label: 'Chat', route: '/chat', active: false },
    { icon: UsersRound, label: 'Team', route: '/team', active: false },
    { icon: Image, label: 'Gallery', route: '/gallery', active: false },
    { icon: Bell, label: 'Alerts', route: '/alerts', active: false },
    { icon: BarChart3, label: 'Charts', route: '/charts', active: false },
    { icon: Calendar, label: 'Calendar', route: '/calendar', active: false },
    { icon: TrendingUp, label: 'Analytics', route: '/analytics', active: false },
    { icon: Settings, label: 'Settings', route: '/settings', active: false }
  ];

  onMenuItemClick(item: MenuItem) {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }

  onToggle() {
    this.toggleSidebar.emit();
  }
}
