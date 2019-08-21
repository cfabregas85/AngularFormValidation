import { Component} from '@angular/core';
import { FormGroup,FormControl, Validator, Validators } from "@angular/forms";
import { Observable  } from "rxjs";


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
  public exist:boolean= false;

  newUser:any  ={
    name:"",
    lastName:"",
    email:"",
    password1:"",
    password2:"",
 }

  user:any  ={
     name:"Pedro",
     lastName:"Rich",
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
       'username':new FormControl('',Validators.required, this.userExist.bind(this.form)),
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

   //Async Validation

   public userExist(control:FormControl):Promise<any>|Observable<any>{
     let exist:any = this;
     let prom = new Promise((resolve,reject)=>{
       setTimeout(()=>{
         if (control.value === "example") {
           resolve({existe:true})
           exist = true;
         }
         else{
           resolve(null)
         }
       },3000)      
     }
    )
    return prom;
   }



   Save(){
     console.log(this.form.value);
     console.log(this.form);
     this.form.reset(this.newUser);
     this.success= true;
   }
}
