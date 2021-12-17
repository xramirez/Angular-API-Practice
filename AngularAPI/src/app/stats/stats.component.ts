import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() finalInfo:{name:string, score:number}

  constructor() { 
    this.finalInfo = {name: '', score: 0}
  }

  ngOnInit(): void {
  }

}
