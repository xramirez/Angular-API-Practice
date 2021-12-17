import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';
import { UserService } from '../user.service';
import { GameInfo } from './game-info';
import { APIInfo } from '../api-info';
import { User } from 'src/User';

@Component({
  selector: 'handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.scss']
})
export class HandlerComponent implements OnInit {
  users:User[] = []

  setup:boolean = false;
  game:boolean = false;
  gameStats:boolean = false;

  apiInfo:APIInfo
  activeUser:string = ''
  finalScore:number = 0;
  finalInfo:{name:string, score:number}

  constructor(private userService:UserService) { 
    this.apiInfo = {category: '', difficulty: '', choiceType: ''}
    this.users = this.userService.getUsers();
    this.finalInfo = {name: '', score: 0}
  }

  ngOnInit(): void {
    this.setup = true;
  }

  startGame(gameInfo:GameInfo){
    this.activeUser = gameInfo.name;
    this.apiInfo = gameInfo.info;
    this.setup = false;
    this.game = true;
  }

  endGame(finalScore:number){
    console.log(this.apiInfo)
    console.log(this.finalScore);
    this.finalInfo = {name: this.activeUser, score: finalScore}
    this.userService.addScore(this.activeUser, finalScore, this.apiInfo.difficulty)

    this.game = false;
    this.gameStats = true;
  }

  clear(){
    this.userService.clearDatabase()
  }

  restartGame(){
    this.game = false;
    this.gameStats = false;
    this.setup = true;
  }
}
