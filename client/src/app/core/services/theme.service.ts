import { Injectable, signal, effect, Injector, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private injector = inject(Injector);
  private isInitialized = false;
  
  // Signal to track dark mode state
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Initialize theme from localStorage or system preference
    this.initializeTheme();
    
    // Apply theme whenever it changes using effect with injector context
    effect(() => {
      // Skip the first run since we already applied the theme in initializeTheme
      if (this.isInitialized) {
        this.applyTheme(this.isDarkMode());
      }
    }, { injector: this.injector, allowSignalWrites: true });
    
    this.isInitialized = true;
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      this.isDarkMode.set(isDark);
      this.applyTheme(isDark);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  private applyTheme(isDark: boolean): void {
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      htmlElement.setAttribute('data-theme', 'light');
    }
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Log for debugging
    console.log('Theme applied:', isDark ? 'dark' : 'light', 'Classes:', htmlElement.className);
  }

  toggleTheme(): void {
    console.log('Toggle theme called. Current:', this.isDarkMode());
    this.isDarkMode.update(value => !value);
    console.log('New theme:', this.isDarkMode());
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }
}
