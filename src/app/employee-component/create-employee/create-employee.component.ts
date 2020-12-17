import { Component, OnInit,ViewChildren,QueryList } from '@angular/core';
import { UserServiceService } from '../../services/userservice/user-service.service';
import { Employee } from "../../Employee";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox:QueryList<any>;
  employee: Employee = new Employee();
  submitted = false;
  userDetail: FormGroup;
  checked = [];
  precio = 0;
  department =['Hr','Sales', 'Finance', 'Engineer','Other'];


  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100) + 'k';
    }
    return value;
  }

  constructor(private employeeService: UserServiceService,
     private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.userDetail = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3),
      Validators.pattern('^[A-Z][A-Za-z]{3,}$')])],
      salary: [null, Validators.required],
      department: [null, Validators.required],
      gender: [null, Validators.required],
      day: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      note: [null, Validators.required],
      profilePic: [null, Validators.required]
    });
  }

  getCheckbox(checkbox){
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => {
         this.checked.push (data.value)
    })
  }

  getPrecio(event) {
    this.precio = event.value;
  }


  Day = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  Month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  Year = [
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];
  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  register() {
    console.log(this.checked)
    var x = this.checked.toString();
    console.log(x)
    var employeeDto = {
      'name': this.userDetail.controls['name'].value,
      'salary': this.precio,
      'department':this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'note':this.userDetail.controls['note'].value,
      'profilePic':this.userDetail.controls['profilePic'].value
    };
    console.log("employee dto is", employeeDto)
    this.employeeService.createEmployee(employeeDto).subscribe((response: any) => {
      console.log("response is " +JSON.stringify(response));
    })
    this.userDetail.reset();
    // this.route.nav
    alert("Submitted Succesfully ")
   }

  onReset() {
    this.userDetail.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.register();
  }

}
