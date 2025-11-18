import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashMessageComponent } from "./shared/components/flash-message/flash-message-component";
import { LoaderComponent } from "./shared/components/loader/loader-component";
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FlashMessageComponent, LoaderComponent, RouterOutlet]
})
export class App {
  protected readonly title = signal('super-admin-dashboard');


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
