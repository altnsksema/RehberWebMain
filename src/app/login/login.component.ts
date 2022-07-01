import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { emailMask } from "text-mask-addons";
import { LoginDto } from "../model/models";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  Form!: FormGroup;
  public emailMask = emailMask;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      sifre: [null, Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      let request = new LoginDto();
      request.email = this.loginForm.value.email;
      request.password = this.loginForm.value.sifre;

      this.service.postLogin(request).subscribe(
        (res) => {
          if (res) {
            this.loginForm.reset();
            console.log(res);
            localStorage.setItem("token",res.AccessToken);
            localStorage.setItem("id",res.UserDto.Id.toString());
            localStorage.setItem("name",res.UserDto.Name.toString());
            localStorage.setItem("surname",res.UserDto.Surname.toString());
            localStorage.setItem("email",res.UserDto.Email.toString());
            localStorage.setItem("usertypeid",res.UserDto.UserTypeId.toString());
            localStorage.setItem("usertypename",res.UserDto.UserTypeName.toString());
            
            this.router.navigate(["departmanlar"]);
          } else {
            alert("Kullanıcı bulunamadı!!");
          }
        },
        (err) => {
          alert("Bir şeyler ters gitti!!");
        }
      );
    } else alert("Zorunlu alanları gir.");
  }

  logForm() {
    console.log(this.loginForm.value);
  }

  get employeeN() {
    return this.Form.get("employeeN");
  }
  get password() {
    return this.Form.get("password");
  }
}
