import { Component} from '@angular/core';
import { FormGroup,FormControl, Validator, Validators } from "@angular/forms";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form){
    border: 1px solid red;
  }
`]
})
export class DataComponent  {

  success:boolean = false;

  newUser:any  ={
    name:"",
    lastName:"",
    email:"",
    password1:"",
    password2:"",
 }

  user:any  ={
     name:"Carlos",
     lastName:"Fabregas",
     email:'example@gmail.com'
  }

  form:FormGroup;  

  constructor() {
    //Validation using FormGroup
    this.form = new FormGroup({
      'name':new FormControl('',[Validators.required,
                                 Validators.minLength(2),
                                  this.noCarlos ]),
      'lastName':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required,
                                   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                  ]),
       'Password1':new FormControl('',Validators.required),
       'Password2':new FormControl()
    })
      // Validation using Controls    
        this.form.controls['Password2'].setValidators([
         Validators.required,
         this.passValidator.bind(this.form)
     ])    
   }

   // My Validations 
   noCarlos(control:FormControl):{[s:string]:boolean}
   {
        if (control.value === "Carlos") {
          return { noCarlos : true }
        }       
        return null;
   }

   passValidator(control:FormControl):{[s:string]:boolean}
   {
        let form:any = this;
        if (control.value !== form.controls['Password1'].value) {
          return { passValidator : true }
        }       
        return null;
   }

   Save(){
     console.log(this.form.value);
     console.log(this.form);
     this.form.reset(this.newUser);
     this.success= true;
   }
}
