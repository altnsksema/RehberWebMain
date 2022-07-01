import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sifre',
  templateUrl: './sifre.component.html',
  styleUrls: ['./sifre.component.css']
})
export class SifreComponent implements OnInit {

  ProfileForm!: FormGroup;

  
  constructor(
    private fb: FormBuilder,
  ) { 
    
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.ProfileForm = this.fb.group({
        eski_sifre: ["",Validators.required],
        birinci_sifre: ["", Validators.required],
        ikinci_sifre: ["", Validators.required],
      })
    }
 
  send(){
    if(this.ProfileForm.controls['birinci_sifre'].value== this.ProfileForm.controls['ikinci_sifre'].value){

    }
  }
}
