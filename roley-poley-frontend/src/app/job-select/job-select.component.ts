import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Job } from '../types'
import _jobs  from '../../assets/jobs.json';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {startWith, map, filter, observeOn} from 'rxjs/operators'
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
  already_selected: Set<Job> = new Set();
  filteredJobs: Observable<Job[]>;

  @Input() id!: JobSelect;
  @Input() already_selected_observable?: BehaviorSubject<Set<Job>>;
  @Output() jobChange = new EventEmitter<JobSelect>();

  constructor(private cdrRef: ChangeDetectorRef) {
    this.filteredJobs = this.jobFilterControl.valueChanges.pipe(
      startWith(''),
      map(job => (job ? this._filterJobsSearch(job) : this.jobs)),
    )

    this.jobFormControl.valueChanges.subscribe(
      (job: Job) => {
        console.log(job)
        if (this.already_selected.has(job)) {
          console.log("error, job already selected")
        }
        this.id.old_job = this.id.job
        this.id.job = job
        if (job !== undefined) {
          this.jobChange.emit(this.id)
        }
      }
    )
  }

  private _filterJobsSearch(value: string): Job[] {
    const filterValue = value.toUpperCase()

    return this._filterJobsAlreadySelected().filter(job => job.short_name.startsWith(filterValue))
  }

  private _filterJobsAlreadySelected(): Job[] {
    return _jobs.filter(job => !this.already_selected.has(job))
  }

  ngOnInit(): void {
    // if we're given a job value by the parent update the selection
    this.jobFormControl.setValue(
      this.jobs.filter(job => job.short_name === this.id.job?.short_name)[0]
    )

    if (this.already_selected_observable !== null) {
      this.already_selected_observable!.subscribe({
        next: (job_set: Set<Job>) => {
          console.log(this.id.pref_level, this.id.index)
          this.already_selected = new Set(job_set)
          this.already_selected.delete(this.jobFormControl.value)
          this.jobs = this._filterJobsAlreadySelected()

          // incredibly stupid hack to get the valueChanges observable to trigger
          // there's got to be a better way to do this
          this.jobFilterControl.setValue(' ')
          this.jobFilterControl.setValue('')
        }
      })
    }
  }
}
