import { Component, HostListener, OnInit, signal, inject, effect } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftSidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
