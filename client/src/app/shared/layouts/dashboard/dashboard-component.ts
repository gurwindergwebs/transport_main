import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar-component";
import { HeaderComponent } from "../../components/header/header-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-component.html',
  standalone: true,
})
export class DashboardComponent {

}
