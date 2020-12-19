import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebservicesService {
  readonly rootURL
  public apiConstant = {
    getList: "userList"
  };

  constructor(private http: HttpClient) {
    this.rootURL = "http://localhost:3000/";

  }

  getList() {
    return this.http.get(`${this.rootURL}${this.apiConstant.getList}`);
  }

  addList(studentObj) {
    return this.http.post(`${this.rootURL}${this.apiConstant.getList}`, studentObj);
  }

  updateList(studentObj,id) {
    return this.http.patch(`${this.rootURL}${this.apiConstant.getList}/${id}`, studentObj);
  }

  remove(id) {
    return this.http.delete(`${this.rootURL}${this.apiConstant.getList}/${id}`);
  }
}
