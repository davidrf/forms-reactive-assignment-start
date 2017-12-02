import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];
  invalidNames = ['Test'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'name': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'name': new FormControl(null, Validators.required, this.forbiddenNamesAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable'),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.invalidNames.includes(control.value)) {
      return { 'nameIsForbidden': true };
    }

    return null;
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.invalidNames.includes(control.value)) {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500)
    });

    return promise;
  }
}
