import { Component } from '@angular/core';
import {NgForm  } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {


  successTempalteValidation:boolean = false;

  user:object = {
    name:null,
    lastName:null,
    email:null,
    country:"",
    sex:"",
    terms: false
  }

  countries=[{
     code:"US",
     name: "EEUU"
  },{
    code:"CUB",
     name: "Cuba"
  }]

  constructor() { }

  Save(form : NgForm){    
    console.log( "ngForm",form);
    console.log( "Value Form", form.value );
    console.log( "Usuario", this.user );
    this.successTempalteValidation=true; 
    form.reset();   
  }  
}
