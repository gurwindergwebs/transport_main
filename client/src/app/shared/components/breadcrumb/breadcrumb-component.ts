import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-breadcrumb-component',
  imports: [RouterLink, CommonModule, LucideAngularModule],
  templateUrl: './breadcrumb-component.html',
  standalone: true,
})
export class BreadcrumbComponent {
  @Input() items: { label: string; link?: string }[] = [];
  ChevronRight = ChevronRight; // icon
}
