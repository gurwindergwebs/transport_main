import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FlashMessageType = 'success' | 'error';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  private messageSubject = new BehaviorSubject<string | null>(null);
  private typeSubject = new BehaviorSubject<FlashMessageType>('success');
  private visibleSubject = new BehaviorSubject<boolean>(false);

  message$ = this.messageSubject.asObservable();
  type$ = this.typeSubject.asObservable();
  visible$ = this.visibleSubject.asObservable();

  show(message: string, type: FlashMessageType = 'success', duration: number = 2000): void {
    this.messageSubject.next(message);
    this.typeSubject.next(type);
    this.visibleSubject.next(true);

    setTimeout(() => this.hide(), duration);
  }

  hide(): void {
    this.visibleSubject.next(false);
  }
}
