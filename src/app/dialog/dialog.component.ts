import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { emailMask } from "text-mask-addons";
import { ApiService } from "../services/api.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Person, PersonDto } from "../model/models";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  public isSubmit: boolean = false;
  public emailMask = emailMask;
  departmanlar: any[] = [];
  unvanlar: any[] = [];
  personelForm!: FormGroup;
  actionBtn: string = "Kaydet";
  personModel: PersonDto = new PersonDto();
  editData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";


  constructor(
    private readonly fb: FormBuilder,
    private api: ApiService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>,
    
  ) {
    this.editData = data;
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllDepartman();
  
  }
 

  initForm() {
    this.personelForm = this.fb.group({
      id: [0],
      ad: ["", Validators.required],
      soyad: ["", Validators.required],
      telefon: ["", Validators.required],
      dahilitelefon: ["", Validators.required],
      departmanId: [0, Validators.required],
      unvanId: ["", Validators.required],


    });

    if (this.editData) {
      this.actionBtn = "Güncelle";
      this.personelForm.controls["id"].setValue(this.editData.Id);
      this.personelForm.controls["ad"].setValue(this.editData.Name);
      this.personelForm.controls["soyad"].setValue(this.editData.SurName);
      this.personelForm.controls["telefon"].setValue(this.editData.PhoneNumber);
      this.personelForm.controls["dahilitelefon"].setValue(this.editData.InternalNumber);
      this.personelForm.controls["departmanId"].setValue(this.editData.DepartmentId);
      this.personelForm.controls["unvanId"].setValue(this.editData.TitleId);
    }
  }


  kisiEkle() {
    
      if (this.personelForm.valid) {
        var obj = new PersonDto();
        obj.DepartmentId=this.personelForm.value.departmanId;
        obj.Id=this.personelForm.value.id;
        obj.Name=this.personelForm.value.ad;
        obj.SurName=this.personelForm.value.soyad;
        obj.PhoneNumber=this.personelForm.value.telefon;
        obj.InternalNumber=this.personelForm.value.dahilitelefon;
        obj.TitleId=this.personelForm.value.unvanId;
        this.api.postPerson(obj).subscribe({

          next: (res) => {
            if(obj.Id>0) {
              this._snackBar.open("Kayıt başarı ile güncellendi", "Kapat", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.dialogRef.close();
            
           } else {
            this._snackBar.open("Kayıt başarı ile eklendi", "Kapat", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.personelForm.reset();
           }
            
            
           
          },
          error: (error) => {
            
          },
        });
      }
  
 
}
 
editPerson(row: any) {
  this.dialog
    .open(DialogComponent, {
      width: '50%',
      data: row,
    })
    .afterClosed()
    .subscribe((val) => {
      if (val === 'güncelle') {
        this.getAllDepartman();
      }
    });
}

getAllDepartman() {
  this.api.getAllDepartman().subscribe({
    next: (res) => {
      res.forEach((element) => {
        this.departmanlar.push({
          ad: element.DepartmentName,
          id: element.DepartmentId,
        });
      });
    },
    error: (err) => {
      alert("Kayıtlar alınırken hata oluştu!");
    },
  });
}
getTitleByDepartmanId(depId:any) {
  this.unvanlar = [];
  this.api.getTitleByDepartmanId(depId).subscribe({
    next: (res) => {
      res.forEach((element) => {
        this.unvanlar.push({
          ad: element.TitleName,
          id: element.Id,
          order: element.Order,
        });
      });
    },
    error: (err) => {
      alert("Kayıtlar alınırken hata oluştu!");
    },
  });
}

}