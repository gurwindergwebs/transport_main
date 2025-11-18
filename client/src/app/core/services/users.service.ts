import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../shared/models/interface';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // create user
  createUser(formData: FormData): Observable<Users> {
    return this.http.post<Users>(apiUrl, formData);
  }

  // get user by id
  getUserById(userId: number): Observable<Users> {
    return this.http.get<Users>(`${apiUrl}/${userId}`);
  }

  // get all users
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(apiUrl);
  }

  // update user
  updateUser(userId: number, data: FormData): Observable<Users> {
    return this.http.put<Users>(`${apiUrl}/${userId}`, data);
  }

  // delete user
  deleteUser(userId: number): Observable<Users> {
    return this.http.delete<Users>(`${apiUrl}/${userId}`);
  }
}
