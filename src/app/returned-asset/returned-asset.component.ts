import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormService } from '../form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-returned-asset',
  templateUrl: './returned-asset.component.html',
  styleUrls: ['./returned-asset.component.css']
})
export class ReturnedAssetComponent implements OnInit {

  employee: any;
  employeeId: any;
  returnedDate : string = '';

  constructor( 
    private formService: FormService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef?: MatDialogRef<ReturnedAssetComponent>,
  ){
    console.log('ReturnedAssetComponent constructor called', data);
    if(data && data.employee){
     this.employee ={
      ...data.employee,
      returnedDate: ''
     };
     console.log("employee", this.employee);
    }
  }

  ngOnInit(): void {
    console.log('ReturnedAssetComponent ngOnInit called', this.data);
    if(!this.employee){
      this.employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.employeeId) { //if employee id is found 
      this.formService.getEmployeeById(this.employeeId).subscribe((data: any) => {
        this.employee = data;
        console.log("Employee Details", this.employee);
      });
    }
  }
}

  cancel(){
    this.dialogRef.close('cancel');
  }

  submitForm(){
    this.formService.submitReturnAssets(this.employee).subscribe((res) => {
      alert(" Returned Succesfully !!");
      this.dialogRef.close('confirm');
    })
  }

}

