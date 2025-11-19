import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, RouterModule, SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard-component.html',
  standalone: true,
  styleUrls: ['./dashboard-component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
