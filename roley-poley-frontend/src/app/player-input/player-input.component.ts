import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobSelectComponent } from '../job-select/job-select.component';
import { Job } from '../types'

export interface JobSelect {
  pref_level: number,
  index: number,
  job?: Job,
  old_job?: Job
}

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})


export class PlayerInputComponent {
  constructor () {}

  already_selected: Set<Job> = new Set()
  already_selected_observable: BehaviorSubject<Set<Job>> = new BehaviorSubject(this.already_selected)


  job_choices: JobSelect[][] = [
    [{
      pref_level: 0,
      index: 0,
      job: undefined,
      old_job: undefined
    }]
  ]

  onJobChange($event: JobSelect) {

    const pref_level = $event.pref_level
    const index = $event.index
    const job = $event.job!  // this handler does not fire if job is undefined
    const old_job = $event.old_job

    if (old_job !== undefined && this.already_selected.has(old_job)) {
      this.already_selected.delete(old_job)
    }
    this.already_selected.add(job)
    this.already_selected_observable.next(this.already_selected)


    if (pref_level + 1 == this.job_choices.length) {
      this.job_choices.push([{
        pref_level: pref_level + 1,
        index: 0,
        job: undefined
      }])
    }

    if (index + 1 == this.job_choices[pref_level].length) {
      this.job_choices[pref_level].push({
        pref_level: pref_level,
        index: index + 1,
        job: undefined
      })
    }
  }
}
