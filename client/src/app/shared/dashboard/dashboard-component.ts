import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { LeftSidebarComponent } from "../components/left-sidebar/left-sidebar.component";
import { MainComponent } from "../../main/main.component";
import { DashboardRoutingModule } from "./dashboard-routing-module";

@Component({
  selector: 'app-dashboard-component',
  imports: [LeftSidebarComponent, MainComponent, DashboardRoutingModule],
  templateUrl: './dashboard-component.html',
  standalone: true,
})
export class DashboardComponent {
  private sidebarService = inject(SidebarService);
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  constructor() {
    // Sync service state with local state
    effect(() => {
      this.isLeftSidebarCollapsed.set(this.sidebarService.isCollapsed());
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.sidebarService.setCollapsed(true);
    }
  }

  ngOnInit(): void {
    const shouldCollapse = this.screenWidth() < 768;
    this.sidebarService.setCollapsed(shouldCollapse);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.sidebarService.setCollapsed(isLeftSidebarCollapsed);
  }
}
