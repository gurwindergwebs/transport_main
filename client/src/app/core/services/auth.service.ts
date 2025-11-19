import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/api/auth`;

  // User login
  login(formData: FormData): Observable<{ user: User; accessToken: string }> {
    return this.http.post<{ user: User; accessToken: string }>(
      `${this.apiUrl}/login`,
      formData
    );
  }
}
