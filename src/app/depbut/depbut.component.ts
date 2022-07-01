import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { emailMask } from "text-mask-addons";
import { ApiService } from "../services/api.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DepartmentDto } from "../model/models";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Component({
  selector: "app-depbut",
  templateUrl: "./depbut.component.html",
  styleUrls: ["./depbut.component.css"],
})
export class DepbutComponent implements OnInit {
  public isSubmit: boolean = false;
  public emailMask = emailMask;
  departmanlar!: any[];
  departmanForm!: FormGroup;
  actionBtn: string = "Kaydet";
  departmanModel: DepartmentDto =new DepartmentDto();
  editData:any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private readonly fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepbutComponent>,
    private _snackBar: MatSnackBar
  
    ) {
    
      this.editData = data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
  this.departmanForm = this.fb.group({
      id: [0],
      ad: ["", Validators.required],
    });
    
    if (this.editData) {
      this.actionBtn = "Güncelle";
      this.departmanForm.controls["ad"].setValue(this.editData.DepartmentName);
      this.departmanForm.controls["id"].setValue(this.editData.DepartmentId);
    }
  }

  ekle(){
    this.departmanModel.DepartmentId=this.departmanForm.controls["id"].value;
    this.departmanModel.DepartmentName=this.departmanForm.controls["ad"].value
    
    this.api.addDepartman(this.departmanModel).subscribe({
      next: (res) => {
        if(this.departmanModel.DepartmentId >0) {
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
        this.departmanForm.reset();
        this.dialogRef.close();
       }
        
        
      },
      error: (err) => {
        
      },
    });
  }
}