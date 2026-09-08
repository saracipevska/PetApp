import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PetService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAdoptionPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/adoption`);
  }

  savePet(pet: any): Observable<any> {
    return this.http.post(this.api, pet);
  }

  saveAdoptionRequest(request: any): Observable<any> {
    return this.http.post(`${this.api}/adoption-requests`, request);
  }

  getAdoptionRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/adoption-requests`);
  }

  getLostPets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/lost`);
  }

  saveLostPet(pet: any): Observable<any> {
    return this.http.post(this.api, pet);
  }
}
