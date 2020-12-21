import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { WebservicesService } from '../webservices.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmodifyuser',
  templateUrl: './addmodifyuser.component.html',
  styleUrls: ['./addmodifyuser.component.scss']
})
export class AddModifyUserComponent implements OnInit {
  public submitted: boolean = false;
  public alertText: any = { text: "", class: "" };
  public userList: any = [];
  public userListAll: any = [];
  public isModify: boolean = false;
  public modifyId: any;
  public user = this.fb.group({
    userId: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^\w+$/), this.validatorId()]],
    firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    middlename: ['', Validators.pattern(/^[a-zA-Z\s]+$/)],
    lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{6,20})$/)]],
    email: ['', [Validators.required, Validators.email]],
    address1: [''],
    address2: [''],
    city: [''],
    state: [''],
    zip: ['',[Validators.minLength(6),Validators.maxLength(6),Validators.pattern(/^[0-9]+$/)]]
  });
  cityData: any = 'Maharashtra';
  stateList: any = ['Maharashtra', 'Gujarat', 'Asam', 'Bihar', 'Delhi', 'Manipur', 'Punjab', 'Mizoram', 'Rajasthan'];
  myOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options...
  };
  public today: Date = new Date();
  constructor(public fb: FormBuilder, public webService: WebservicesService,
    public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {
    this.getUserList();
  }



  validatorId(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let flag: boolean = false;
      const initialValue: any = control.value ? control.value : ''
      if (typeof initialValue == 'string' && !this.isModify) {
        this.userList.filter(section => {
          if (section.userId.toLowerCase() == initialValue.toLowerCase()) {
            flag = true;
          }
        });
        return flag ? { 'userIdExist': true } : null
      } else {
        return null
      }
    }
  }


  getUserList() {
    this.webService.getList().subscribe((data: any) => {
      console.log(data);
      this.userList = data;
      this.route.params.subscribe(id => {
        if (id.Id) {
          this.modifyId = id.Id;
        }
        console.log("param", id);
      });
      if (this.modifyId) {
        this.userList.filter(user => {
          if (this.modifyId == user._id) {
            this.isModify = true;
            this.user.get('userId').setValue(user.userId);
            this.user.get('firstname').setValue(user.firstname);
            this.user.get('middlename').setValue(user.middlename);
            this.user.get('lastname').setValue(user.lastname);
            this.user.get('password').setValue(user.password);
            this.user.get('email').setValue(user.email);
            this.user.get('address1').setValue(user.address1);
            this.user.get('address2').setValue(user.address2);
            this.user.get('city').setValue(user.city);
            this.user.get('state').setValue(user.state);
            this.user.get('zip').setValue(user.zip);
          }
        });
      }
    }, error => {
      console.log(error);
    });
  }

  addStudent() {
    this.submitted = true;
    // this.selection = [];
    window.scroll(0, 0);
    console.log(this.user)
    if (this.user.valid) {
      if (!this.isModify) {
        // this.user.get('userId').setValue(this.userList.length + 1);
        this.webService.addList(this.user.value).subscribe((data: any) => {
          console.log(data);
          this.alertText.class = "alert-success";
          this.alertText.text = "User added successfully !";
          setTimeout(() => {
            this.alertText.text = "";
            this.isModify = false;
            this.user.reset();
          }, 5000);
          this.submitted = false;
          this.getUserList();
        }, error => {
          console.log(error);
        });
      } else {
        this.webService.updateList(this.user.value, this.modifyId).subscribe((data: any) => {
          console.log(data);
          this.alertText.class = "alert-success";
          this.alertText.text = "User updated successfully !";
          setTimeout(() => {
            this.alertText.text = "";
            this.isModify = false;
            this.submitted = false;
            this.user.reset();
          }, 5000);
          this.getUserList();
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.alertText.class = "alert-danger";
      this.alertText.text = "Please enter valid information in the form";
      setTimeout(() => {
        this.alertText.text = "";
      }, 5000);
    }
  }


  reset() {
    // this.submitted = false;
    this.isModify = false;
    this.user.reset();
    this.router.navigate(['adduser']);
  }

}
