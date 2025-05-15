import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  // title = 'angular-reactive-form';

  // reactiveForm: FormGroup;

  // ngOnInit(){
  //     this.reactiveForm = new FormGroup({
  //       firstname : new FormControl(null, Validators.required),
  //       lastname : new FormControl(null, Validators.required),
  //       email : new FormControl(null, [Validators.required, Validators.email]),  
  //       username : new FormControl(null),
  //       dob : new FormControl(null, Validators.required),
  //       gender: new FormControl('male'),
  //       address:  new  FormGroup({
  //         street : new FormControl(null,  Validators.required),
  //         country : new FormControl('India', Validators.required),
  //         city : new FormControl(null,Validators.required),
  //         region : new FormControl(null),
  //         postal : new FormControl(null, Validators.required)
  
  //       }),
  //       skills: new FormArray([
  //           new FormControl(null, Validators.required),
            
  //       ]),

  //       experience: new FormArray([
           
  //       ]),
        
  //     })

  //     // this.reactiveForm.get('firstname').valueChanges.subscribe((value)=>{
  //     //   console.log(value);
  //     // })
  // }

  // OnFormSubmitted(){
  //   console.log(this.reactiveForm);
  // }

  // AddSkills(){
  //   (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  // }

  // DeleteSkill(index: number){
  //       const controls = (<FormArray>this.reactiveForm.get('skills'));
  //       controls.removeAt(index);
  // }

  // AddExp(){
  //   const formgroup=  new FormGroup({
  //     company: new FormControl(null),
  //     position: new FormControl(null),
  //     totalexp: new FormControl(null),
  //     start: new FormControl(null),
  //     end: new FormControl(null),

  //   });
  //   (<FormArray>this.reactiveForm.get('experience')).push(formgroup);
  // }

  // DeleteExp(index: number){
  //     const deleteexp = (<FormArray>this.reactiveForm.get('experience'));
  //    deleteexp.removeAt(index);
  // }

  // generateUsername(){
  //   let username='';

  //   const fname: string= this.reactiveForm.get('firstname').value;
  //   const lname: string = this.reactiveForm.get('lname').value;
  //   const dob: string = this.reactiveForm.get('dob').value;

  //   if(fname.length>=3){
  //     username += fname.slice(0,3);
  //   }
  //   else{
  //     username += fname;
  //   }
  //   if(lname.length>=3){
  //     username += lname.slice(0,3);
  //   }
  //   else{
  //     username += lname;
  //   }

  //   let datetime = new Date(dob);
  //   username += datetime.getFullYear();

  //   username = username.toLowerCase();

  //   console.log(username);

  // }

  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hideForRoutes = ['/', '/login', ''];  
      this.showSidebar = !hideForRoutes.includes(event.urlAfterRedirects);
    });
  }
}
 