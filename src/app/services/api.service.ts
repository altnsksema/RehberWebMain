import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Department,
  LoginDto,
  LoginResponseDto,
  Person,
  PersonDto,
  Title,
  Token,
} from "../model/models";

@Injectable({
  providedIn: "root",
})

export class ApiService {
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  postLogin(data: LoginDto) {
    return this.http.post<LoginResponseDto>(
      "https://localhost:7188/api/Logins/action",
      data
    );
  }

  getAllDepartman() {
    return this.http.get<Array<Department>>(
      "https://localhost:7188/api/Departments",
      { headers: new HttpHeaders(this.httpOptions) }
    );
  }

  getPersonListByDepartmanId(id: number) {
    return this.http.get<Array<Person>>(
      "https://localhost:7188/api/Departments/GetPersonDepartmentById/" +id,
      { headers: new HttpHeaders(this.httpOptions) }
    );
  }

  addDepartman(data: any) {
    return this.http.post<any>("https://localhost:7188/api/Departments", data, {
      headers: new HttpHeaders(this.httpOptions),
    });
  }

  getDepartman(id: number) {
    return this.http.get<Department>(
      "https://localhost:7188/api/GetDepartments/" + id,
      { headers: new HttpHeaders(this.httpOptions) }
    );
  }

  deleteDepartman(id: number) {
    return this.http.delete<any>(
      "https://localhost:7188/api/Departments/" + id,
      { headers: new HttpHeaders(this.httpOptions) }
    );
  }

  getAllPersons() {
    return this.http.get<Array<Person>>("https://localhost:7188/api/Persons", {
      headers: new HttpHeaders(this.httpOptions),
    });
  }
  getPerson(id: number) {
    this.http.get<Person>("https://localhost:7188/api/Persons/" + id, {
      headers: new HttpHeaders(this.httpOptions),
    });
  }
  postPerson(data: PersonDto) {
    return this.http.post<Person>("https://localhost:7188/api/Persons", data, {
      headers: new HttpHeaders(this.httpOptions),
    });
  }
  deletePerson(id: number) {
    return this.http.delete<any>("https://localhost:7188/api/Persons/" + id, {
      headers: new HttpHeaders(this.httpOptions),
    });
  }
  getTitleByDepartmanId(id : number) {
    return this.http.get<Array<Title>>("https://localhost:7188/api/Departments/TitleByDepartmentId/" + id, { 
      headers: new HttpHeaders(this.httpOptions) }
    );
  }
  
}

