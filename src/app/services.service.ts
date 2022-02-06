import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}
  getItems() {
    return this.http.get('http://localhost:3000/menu');
  }
  postItems(data: any) {
    return this.http.post('http://localhost:3000/menu', data);
  }
  deleteItems(id: string) {
    return this.http.delete(`http://localhost:3000/menu/${id}`);
  }
  editItems(data: any, id: string) {
    return this.http.patch(`http://localhost:3000/menu/${id}`, data);
  }
}
