import { Component, OnInit } from '@angular/core';
import { Job } from '../types'

export interface JobSelect {
  name: string,
  pref_level: number,
  index: number,
  job?: Job
}

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})


export class PlayerInputComponent {
  constructor () {}
}
