import { Component, OnInit } from '@angular/core';
import { Job } from '../types'
import _jobs  from '../../assets/jobs.json';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-select',
  templateUrl: './job-select.component.html',
  styleUrls: ['./job-select.component.css']
})
export class JobSelectComponent implements OnInit {

  constructor() { }
  jobs: Job[] = _jobs

  jobSelect = new FormControl();

  selected_jobs: Job[] = []

  ngOnInit() {
    this.jobs.forEach(job => {
      job.icon = "../../assets/" + job.icon
    });
  }
}
