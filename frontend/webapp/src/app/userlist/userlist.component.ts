import { Component, OnInit } from '@angular/core';
import { WebservicesService } from '../webservices.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  public userList: any = [];
  public userListAll: any = [];
  public selection: any = [];
  public skip: number = 0;
  public totalPage: number;

  constructor(public webService: WebservicesService,public router:Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  actionCheck(event, id) {
    if (event && this.selection.indexOf(id) == -1) {
      this.selection.push(id);
    } else if (!event && this.selection.indexOf(id) > -1) {
      this.selection.splice(this.selection.indexOf(id), 1);
    }
    console.log(this.selection);
  }

  pageChange(isNext) {
    isNext ? this.skip++ : this.skip--;
    this.userList = this.userListAll.filter((item, index) => {
      return this.skip * 10 > index;
    })
    console.log(this.totalPage, this.skip, this.userList);
  }

  
  deleteAll() {
    this.selection.filter(id => {
      this.webService.remove(id).subscribe((data: any) => {
        console.log(data);
        this.selection = [];
        this.getUserList();
        // this.userList = data;
      }, error => {
        console.log(error);
      });
    })
  }

  modifyDetails() {
    this.router.navigate(['modifyuser/',this.selection[0]])
  }

  getUserList() {
    this.webService.getList().subscribe((data: any) => {
      console.log(data)
      this.userListAll = data;
      let len: any = (this.userListAll.length / 10);
      this.totalPage = parseInt(len, 10) + 1;
      this.skip = 1;
      this.userList = this.userListAll.filter((item, index) => {
        return this.skip * 10 > index;
      })
      console.log(this.totalPage, this.skip, this.userList);
    }, error => {
      console.log(error);
    });
  }

}
