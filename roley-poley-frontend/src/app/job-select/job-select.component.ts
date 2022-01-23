import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Job } from '../types'
import _jobs  from '../../assets/jobs.json';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators'
import { JobSelect } from '../player-input/player-input.component';

@Component({
  selector: 'app-job-select',
  templateUrl: './job-select.component.html',
  styleUrls: ['./job-select.component.css']
})
export class JobSelectComponent implements OnInit {

  jobs: Job[] = _jobs;
  jobFormControl = new FormControl();
  jobFilterControl = new FormControl();
  filteredJobs: Observable<Job[]>;

  @Input() id!: JobSelect;
  @Output() jobSelectEvent = new EventEmitter<JobSelect>();

  constructor() {
    this.filteredJobs = this.jobFilterControl.valueChanges.pipe(
      startWith(''),
      map(job => (job ? this._filterJobs(job) : this.jobs))
    )

    this.jobFormControl.valueChanges.subscribe(
      (job: string) => {
        console.log(job)
        this.jobSelectEvent.emit(this.id)
      }
    )
  }

  private _filterJobs(value: string): Job[] {
    const filterValue = value.toUpperCase()

    return this.jobs.filter(job => job.short_name.startsWith(filterValue))
  }

  disp_job(job: Job): string {
    return job.short_name
  }

  ngOnInit(): void {
      
  }
}
