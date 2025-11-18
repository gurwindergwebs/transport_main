import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-tile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="relative bg-white rounded-xl shadow-md p-8 flex flex-col justify-between overflow-hidden group hover:shadow-lg transition max-[424px]:p-4 max-[424px]:rounded-lg">
      <div class="flex items-center justify-between gap-4 max-[424px]:gap-2">
        <div class="rounded-full bg-primary p-3 text-white text-2xl shadow max-[424px]:p-2 max-[424px]:text-lg" [ngClass]="iconBgClass">
          <i [class]="icon"></i>
        </div>
        <div>
          <div class="text-xs font-semibold text-gray-500 tracking-wider max-[424px]:text-[10px]">{{ label }}</div>
          <div class="text-2xl font-bold text-gray-800 max-[424px]:text-lg">{{ value }}<span *ngIf="unit" class="text-xs font-normal text-gray-400 ml-1 max-[424px]:text-[10px]">{{ unit }}</span></div>
        </div>
      </div>
      <div class="flex items-center justify-center gap-2 mt-4 max-[424px]:mt-2 max-[424px]:gap-1">
        <span class="text-md font-semibold max-[424px]:text-xs" [ngClass]="trendClass">{{ trend }}% <i [class]="trendIcon"></i></span>
        <span class="text-md1 text-gray-400 max-[424px]:text-[10px]">Since last month</span>
      </div>     
    </div>
  `,
    styles: []
})
export class DashboardTileComponent {
    @Input() label = '';
    @Input() value = '';
    @Input() unit?: string;
    @Input() icon = '';
    @Input() iconBgClass = 'bg-blue-500';
    @Input() trend = '';
    @Input() trendClass = '';
    @Input() trendIcon = '';
}
