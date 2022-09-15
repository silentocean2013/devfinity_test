import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeSheetModal } from './timeSheetModal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devfinity_test';
  timeSheetData: TimeSheetModal[] | any;
  Object = Object;

  hoursRegex = /^((((1\d)|(2[0-3])|\d)(\.\d?\d?)?)|((24)((\.0)?0?)?))$/;
  dateTitles = { date1: "Mon", date2: "Tue", date3: "Wed", date4: "Thu", date5: "Fri", date6: "Sat", date7: "Sun" };

  updateTimeForm: any = this.fb.group({
    workTitle: ['', Validators.required],
    day: ['', Validators.required],
    inputHours: ['', Validators.required]
  });
  isSubmitted: boolean;
  constructor(private fb: FormBuilder) {
    this.isSubmitted = false;
    this.timeSheetData = [
      {
        _id: 1,
        name: 'Developer 1',
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        date5: null,
        date6: null,
        date7: null,
      },
      {
        _id: 2,
        name: 'Developer 2',
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        date5: null,
        date6: null,
        date7: null,
      },
      {
        _id: 3,
        name: 'Quality Assurance',
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        date5: null,
        date6: null,
        date7: null,
      }
    ];
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateTimeForm.controls[controlName].hasError(errorName);
  }

  updateTime(time: any, index: number, date: string) {
    time = time.trim();   // trim starting and trailing white spaces
    time = time.replace(/^0+/, ''); // remove leading 0's from input time

    if (!time) {
      return;
    }
    if (this.hoursRegex.test(time)) {
      this.timeSheetData[index][date] = parseFloat(time).toFixed(2);
    } else {
      alert('please provide a valid input!!. accepted-range: (0:00-24:00), eg. 3, 7.5, 4.50, etc.');
    }
  }

  getTotal(index: number) {
    return (Object.entries(this.timeSheetData?.[index]).slice(2, 9).reduce((accu, curr: any) => accu + this.getFloatValue(curr[1]), 0.00)).toFixed(2);
  }

  getFloatValue(val: any) {
    let result = parseFloat(val);
    if (!isNaN(result)) {
      return result;
    } else {
      return 0;
    }
  }

  updateTimeFromModal() {
    this.isSubmitted = true;
    if (this.updateTimeForm.valid) {
      this.updateTime(this.updateTimeForm?.value?.inputHours, this.updateTimeForm?.value?.workTitle, this.updateTimeForm?.value?.day)
      alert('Hours Updated. Thank you!!')
      this.isSubmitted = false;
      document.getElementById('closeModal')?.click();
    } else {
      alert('please fill out the form with valid data first!1');
    }
  }

  showTableData() {
    alert(JSON.stringify(this.timeSheetData));

    //logic to send the updated Data to API call.
  }
}

