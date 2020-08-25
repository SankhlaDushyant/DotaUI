import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dota } from '../Model';

@Injectable({
  providedIn: 'root'
})
export class LoadDotaCharactersService {

  constructor(private httpClient: HttpClient) { }

  //http://localhost:5000/api/Dotas/5

  URL = 'https://localhost:5001/api/Dotas';

  public getDotaCharacters(): Observable<Dota[]>
  {
    return this.httpClient.get<Dota[]>(this.URL);
  }

  public getDotaCharactersById(Id: number): Observable<Dota> {
    return this.httpClient.get<Dota>(this.URL + '/' + Id);
  }

  public CreateDotaCharacter(Character : Dota): Observable<Dota> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Dota>(this.URL, Character,httpOptions);
  }

  public DeleteDotaCharacter(Id: number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.delete(this.URL + '/' + Id, httpOptions);
  }

  public UpdateDotaCharacter(Character: Dota): Observable<Dota> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.put<Dota>(this.URL,Character,httpOptions);
  }


}
