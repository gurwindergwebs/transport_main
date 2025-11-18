import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed = signal<boolean>(false);

  toggle() {
    this.isCollapsed.update(value => !value);
  }

  setCollapsed(value: boolean) {
    this.isCollapsed.set(value);
  }
}
