import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterPersonService } from '../register-person.service';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.css']
})
export class RegisterPersonComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private personService: RegisterPersonService) { }

  ngOnInit() {
    this.validation()
  }

  save() {
    this.personService.add(this.form.value).subscribe(response => {
      console.log(response)
    })
  }

  reset() {

  }

  validation() {
    this.form = this.fb.group({
      id: [],
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required])
    })
  }

}
