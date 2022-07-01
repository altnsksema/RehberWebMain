import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DepbutComponent } from "../depbut/depbut.component";
import { DialogComponent } from "../dialog/dialog.component";
import { ApiService } from "../services/api.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { DepbyprsComponent } from "../depbyprs/depbyprs.component";

@Component({
  selector: "app-departman",
  templateUrl: "./departman.component.html",
  styleUrls: ["./departman.component.css"],
})
export class DepartmanComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  departmanlar: any[] = [];
  displayedColumns: string[] = ["departmanId", "aksiyon"];
  dataSource!: MatTableDataSource<any>;
  isAdmin: boolean = false;
  persons: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.isAdmin = localStorage.getItem("usertypename") == "Admin";
    if(!this.isAdmin){

      this.displayedColumns = [
      
        "departmanId",
       
      ];
        }
  }

  ngOnInit(): void {
    this.getAllDepartment();
  }

  openDialog() {
    this.dialog
      .open(DepbutComponent, {
        width: "50%",
      }).afterClosed().subscribe((val) => {
        this.getAllDepartment();
      });
  }

  editDepartman(row: any) {
    this.dialog
      .open(DepbutComponent, {
        width: "50%",
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
     
        this.getAllDepartment();
      });
  }

  getpersonlist(row: any) {
    this.dialog
      .open(DepbyprsComponent, {
        width: "50%",
        data: row.DepartmentId,
      })
      .afterClosed()
      .subscribe((val) => {
      });
  }

  deleteDepartman(row: any) {
    this.api.deleteDepartman(row.DepartmentId).subscribe({
      next: (res) => {
        this._snackBar.open("Kayıt başarı ile silindi", "Kapat", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllDepartment();
      },
      error: (err) => {
        this._snackBar.open("Kayıtlar alınırken hata oluştu", "Kapat", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllDepartment() {
    this.api.getAllDepartman().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.data.forEach((element) => {
          element.departmanAd = element.departmentName;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this._snackBar.open("Kayıtlar alınırken hata oluştu", "Kapat", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
    });
  }
}
