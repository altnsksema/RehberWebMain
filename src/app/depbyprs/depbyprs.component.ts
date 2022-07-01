import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../model/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-depbyprs',
  templateUrl: './depbyprs.component.html',
  styleUrls: ['./depbyprs.component.css']
})

export class DepbyprsComponent implements OnInit {
  localData:any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ["ad","soyad","telefon","dahilitelefon","departmanId","unvanId"];


  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}
    ) { 
    this.localData=data;
  }

  ngOnInit(): void {
    this.dataSource;
    this.getPersonsByDepartmanId(this.localData);
  }

  getPersonsByDepartmanId(id: number) {
  
    this.api.getPersonListByDepartmanId(id).subscribe({
      next: (res) => {

        console.log(res);

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.data.forEach((element) => {
          element.departmanAd = element.Department.DepartmentName;
          element.unvanAd = element.Title.TitleName;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  } 
}
