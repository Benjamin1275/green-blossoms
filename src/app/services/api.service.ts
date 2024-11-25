import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000'; // URL del API Gateway

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  addUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }

  // Métodos para otros servicios
  getPlantas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/plantas`);
  }

  addPlanta(planta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/plantas`, planta);
  }

  updatePlanta(id: string, planta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/plantas/${id}`, planta);
  }

  deletePlanta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plantas/${id}`);
  }
}