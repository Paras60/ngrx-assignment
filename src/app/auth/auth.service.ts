import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';

@Injectable()
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    this.user = { id: 1, email: email };
    return of(this.user);
  }
}
