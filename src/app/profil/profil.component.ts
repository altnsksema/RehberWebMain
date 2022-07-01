import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { SifreComponent } from '../sifre/sifre.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  ProfileForm!: FormGroup;

    constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private fb: FormBuilder,
  
    ) { 
    }
  
    ngOnInit(): void {
      this.initForm();
    }
    
    initForm() {
      this.ProfileForm = this.fb.group({
        
        id: [localStorage.getItem("id")],
        name: [localStorage.getItem("name")],
        surname: [localStorage.getItem("surname")],
        email: [localStorage.getItem("email")],
      
      });

    }
    openDialog() {
      this.dialog
        .open(SifreComponent, {
          width: "90%",
        });
    }
  }

