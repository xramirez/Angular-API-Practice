import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @Input() finalInfo: { name: string, score: number }
  //Lots of plot data objects are going to be declared here. It's currently the only way I see this playing out?
  gameData: object[] = []
  gameLayout: object = {}

  allScoresData: object[] = [];
  allScoresLayout: object = {};

  allPlayerData: object[] = [];
  allPlayerLayout: object = {};

  constructor(private userService: UserService) {
    this.finalInfo = { name: '', score: 0 }
  }

  ngOnInit(): void {
    this.gamePlot();
    this.difficultyPlot();
    this.playersPlot();
  }

  gamePlot() {
    console.log(this.finalInfo);
    this.gameData = [
      {
        ids: ['Wins', 'Losses'],
        values: [this.userService.calculateWins(this.finalInfo.name), this.userService.calculateLoss(this.finalInfo.name)],
        labels: ['Wins', 'Losses'], textinfo: 'value', insidetextfont: { size: 35 }, type: 'pie',
        marker: {
          colors: ['#f9564f', '#7b1e7a']
        }
      }
    ]
    this.gameLayout = { width: 500, height: 400, title: 'Total Wins/Losses', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' }
  }

  difficultyPlot() {
    let easy = this.userService.returnScore(this.finalInfo.name, 'easy')
    let med = this.userService.returnScore(this.finalInfo.name, 'medium')
    let hard = this.userService.returnScore(this.finalInfo.name, 'hard')
    let perfect = this.userService.returnScore(this.finalInfo.name, 'perfect')
    let winBar = {
      x: ['Easy', 'Medium', 'Hard'],
      y: [easy[0], med[0], hard[0]],
      name: 'Wins',
      type: 'bar',
    }
    let lossBar = {
      x: ['Easy', 'Medium', 'Hard'],
      y: [easy[1], med[1], hard[1]],
      name: 'Losses',
      type: 'bar',
    }
    let perfectBar = {
      x: ['Perfect Wins'],
      y: [perfect[0]],
      name: 'Perfect Wins',
      type: 'bar',
      marker: {
        color: ['#f3c677']
      }
    }

    this.allScoresData = [winBar, lossBar, perfectBar];
    this.allScoresLayout = { width: 600, height: 400, title: 'Wins/Losses By Difficulty', paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' }
  }

  playersPlot() {
    let userNames = this.userService.getNames();
    let userScores: number[] = [];

    userNames.splice(userNames.findIndex(name => name === this.finalInfo.name), 1)
    userNames.forEach(name => userScores.push(this.userService.calculateWins(name)));

    let activeUser = this.userService.getUser(this.finalInfo.name).name

    let activeBar = {
      x: [activeUser],
      y: [this.userService.calculateWins(activeUser)],
      name: 'Your Score',
      type: 'bar',
      marker: {
        color : ['#b33f62']
      }
    }

    let userBars = {
      x: userNames,
      y: userScores,
      name: "Other's Scores",
      type: 'bar'
    }

    this.allPlayerData = [activeBar, userBars];
    this.allPlayerLayout = { width: 600, height: 400, title: `${this.finalInfo.name}'s Scores Compared to others:`, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' }
  }
}
