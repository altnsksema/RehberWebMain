import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { DialogComponent } from "../dialog/dialog.component";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-kisilistesi",
  templateUrl: "./kisilistesi.component.html",
  styleUrls: ["./kisilistesi.component.css"],
})
export class KisilistesiComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  departmanlar!: any[];
  displayedColumns: string[] = [
    "ad",
    "soyad",
    "telefon",
    "dahilitelefon",
    "departmanId",
    "unvanId",
    "aksiyon",
  ];
  dataSource!: MatTableDataSource<any>;
  isAdmin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getAllPersons: any;
  
  
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.isAdmin = localStorage.getItem("usertypename") == "Admin";

    if(!this.isAdmin){

  this.displayedColumns = [
    "ad",
    "soyad",
    "telefon",
    "dahilitelefon",
    "departmanId",
    "unvanId",
  ];
    }
  }

  ngOnInit(): void {
    this.getAllPersonel();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: "90%",
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllPersons();
      });
  }

  editPersonel(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: "%30",
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllPersonel();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllPersonel() {
    this.api.getAllPersons().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.data.forEach((element) => {
          element.departmanAd = element.Department.DepartmentName;
          element.unvanAd = element.Title.TitleName;
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

  deletePersonel(row: any) {
    this.api.deletePerson(row.Id).subscribe({
      next: (res) => {
        this._snackBar.open("Kayıt başarı ile silindi", "Kapat", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllPersonel();
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
