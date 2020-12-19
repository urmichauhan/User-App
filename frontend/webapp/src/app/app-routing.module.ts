import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddModifyUserComponent } from './addmodifyuser/addmodifyuser.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "adduser", component: AddModifyUserComponent },
  { path: "modifyuser/:Id", component: AddModifyUserComponent },
  { path: "manageuser", component: UserlistComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
