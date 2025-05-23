import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { FormService } from '../form.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import pdf from 'pdf-parse';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit{
  title = 'angular-reactive-form';
  showOtherBackground = false;

  previewUrl: SafeResourceUrl | null = null;
  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder, private formService: FormService, private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, Validators.required),
      username: new FormControl(null),
      gender: new FormControl('male'),
      dateOfJoining: new FormControl(null, Validators.required),
      experienceYears: new FormControl(null, Validators.required),
      backgroundExp: new FormControl(null, Validators.required),
      otherBackground: new FormControl(''), 
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        country: new FormControl(null),
        city: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      })
    });
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
  }

  generateUsername(){
    let username='';
    const fname: string= this.reactiveForm.get('firstname').value;
    const lname: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;
    console.log("firstname:",fname);
    console.log("LastName:",lname);
    console.log("Date of birth:",dob);
    if(fname.length>=3){
      username += fname.slice(0,3);
    }
    else{
      username += fname;
    }
    if(lname.length>=3){
      username += lname.slice(0,3);
    }
    else{
      username += lname;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();
    this.reactiveForm.patchValue({
      username: username
    });

  }
  
  onBackgroundChange(event: any) {
    this.showOtherBackground = event.target.value === 'Other';
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    console.log('File Type:', fileType);
    console.log('File:', file);   
    const url = URL.createObjectURL(file);
    console.log('File URL:', url);

    if (fileType === 'application/pdf') {
      this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      alert('Please upload a PDF file.');
      this.onReset();
    }
  }

  onReset(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if(fileInput)  {
      fileInput.value = '';
      this.previewUrl = null;
    }
  }

  OnSubmit(){
    if(this.reactiveForm.valid){
      const formData = this.reactiveForm.value;
      console.log('Form Data:', formData);
      this.formService.submitForm(formData).subscribe({
        next: (response) => {
          const confirmRedirect = confirm('Do you want to Register another user?');
          if (confirmRedirect) {
            this.reactiveForm.reset();
          }
          else{
            alert('Form submitted successfully!');    
            this.router.navigate(['/dashboard']);
          }
      },
      error: (error) => { 
          console.error('Error submitting form', error);
          alert('Error submitting form');
      }
      }); 
        
  }else{
    this.reactiveForm.markAllAsTouched();
  }
}


}