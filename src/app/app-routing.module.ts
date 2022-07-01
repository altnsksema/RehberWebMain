import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmanComponent } from './departman/departman.component';
import { KisilistesiComponent } from './kisilistesi/kisilistesi.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {path:"departmanlar",component:DepartmanComponent},
  {path:"kisiler",component:KisilistesiComponent},
  {path:"login", component:LoginComponent},
  {path:"profil", component:ProfilComponent},
  {path:"", redirectTo:"login",pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
