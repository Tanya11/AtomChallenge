import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {  User } from '../models/tasks.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = 'https://api-axnobst6ua-uc.a.run.app/api/users';
  constructor( private http: HttpClient) { }


  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error))
    );
  }
  
  createUser(email: string): Observable<any> {
    const userData = { email: email };
    return this.http.post<User>(this.apiUrl, userData).pipe(
      catchError((error: HttpErrorResponse) => {
       // console.error('Error al crear usuario', error);
        return of({ error: 'Error al crear usuario' }); 
      })
    );
  }
}
