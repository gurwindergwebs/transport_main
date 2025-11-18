import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertCircle, CheckCircle, LucideAngularModule, X } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { FlashMessageService } from '../../../core/services/flash-message.service';

@Component({
  selector: 'app-flash-message-component',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './flash-message-component.html',
  standalone: true,
})
export class FlashMessageComponent {
  message = '';
  type: 'success' | 'error' = 'success';
  visible = false;
  X = X;
  AlertCircle = AlertCircle
  CheckCircle = CheckCircle

  private subs: Subscription[] = [];

  constructor(private flashService: FlashMessageService) { }

  ngOnInit(): void {
    this.subs.push(
      this.flashService.message$.subscribe(msg => (this.message = msg || '')),
      this.flashService.type$.subscribe(type => (this.type = type)),
      this.flashService.visible$.subscribe(visible => (this.visible = visible))
    );
  }

  close(): void {
    this.flashService.hide();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
