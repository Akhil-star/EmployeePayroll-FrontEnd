import { Component, OnInit,ViewChildren,QueryList,HostListener } from '@angular/core';
import { UserServiceService } from '../../services/userservice/user-service.service';
import { Employee } from "../../Employee";
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChildren ('checkBox') checkBox:QueryList<any>;
  employee: Employee = new Employee();
  id: any;
  a: boolean = false;
  submitted = false;
  userDetail: FormGroup;
  checked:any[];
  precio : any;
  employees: any;
  isEdit: Boolean;
  departments: string[] =[]
  Department =['Hr','Sales', 'Finance', 'Engineer','Other'];


  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100) + 'k';
    }
    return value;
  }

  constructor(private employeeService: UserServiceService,
     private formBuilder: FormBuilder,private route: ActivatedRoute,
     private router: Router) { }
  
  ngOnInit() {
    this.userDetail = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3),
      Validators.pattern('^[A-Z][A-Za-z\\s]{3,}$')])],
      salary: [null, Validators.required],
      department: [null, Validators.required],
      gender: [null, Validators.required],
      day: [null, Validators.required],
      year: [null, Validators.required],
      month: [null, Validators.required],
      note: [null, Validators.required],
      profilePic: [null, Validators.required]
    });

    this.route.params.subscribe(param => {
      console.log(param)
      if (param && param.id) {
        console.log("inside if")
        this.employeeService.getEmployee(param.id).subscribe((response: any) => {
          console.log(response)
          this.id = param.id;
          this.isEdit = true;
          this.userDetail.controls["name"].setValue(response.name)
          this.userDetail.controls["salary"].setValue(response.salary)
          this.userDetail.controls["gender"].setValue(response.gender)
          this.userDetail.controls["note"].setValue(response.note)
          this.userDetail.controls["profilePic"].setValue(response.profilePic)
          this.departments = response.department; 
          console.log("department", this.departments)
          var str = response.startDate;
          var splited: [0, 1, 2] = str.split(" ");
          console.log("splitted is", splited)
          this.userDetail.controls["day"].setValue(splited[0])
          this.userDetail.controls["month"].setValue(splited[1])
          this.userDetail.controls["year"].setValue(splited[2])

        })
      }
    })
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
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
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
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
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
    this.router.navigate(["/"]).then(()=>{window.location.reload()});
   }

  

  onReset() {
    this.userDetail.reset();
  }

  
  onSubmit() {
    this.submitted = true;
    this.register();
  }

  update() {
    console.log(this.userDetail.controls['gender'].value+" "+this.userDetail.controls['month'].value)
    console.log(this.checked)
    console.log(this.precio)
    var employeeDto = {
      'id': this.id,
      'name': this.userDetail.controls['name'].value,
      'salary': this.precio,
      'department': this.checked,
      'gender': this.userDetail.controls['gender'].value,
      'startDate': this.userDetail.controls['day'].value + " " + this.userDetail.controls['month'].value + " " + this.userDetail.controls['year'].value,
      'profilePic':this.userDetail.controls['profilePic'].value,
      'note':this.userDetail.controls['note'].value,
    };
    console.log("employeedto:",employeeDto);

    this.employeeService.updateEmployee(employeeDto).subscribe((response: any) => {
    console.log("response is " + JSON.stringify(response));
    this.router.navigate(["/"]);

    })
  }

  toggleCheckBox(department){
    return (this.departments.includes(department)) ? true : false;
 }
}


