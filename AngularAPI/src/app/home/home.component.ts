import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';
import { UserService } from '../user.service';
import { User } from 'src/User';
import { APIInfo } from '../api-info';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results: Array<any> = [];
  users: User[] = [];
  selectedUser:string = '';
  showInfo:boolean = false;
  triviaInfo:APIInfo;

  @Output() gameOutput = new EventEmitter();

  constructor(private triviaService: TriviaService, private userService:UserService) { 
    this.triviaInfo = {difficulty: '', category: '', choiceType: ''}
  }

  ngOnInit(): void {
    //Just gonna test to see if we actually get results here:
    this.getUsers();
  }

  getUsers(){
    this.users = this.userService.getUsers();
    console.log(this.users)
  }

  generateUser(name:string){
    this.userService.generateUser(name);

    this.getUsers();
  }

  startGame(){
    let gameInfo = {name: this.selectedUser, info: this.triviaInfo}

    this.gameOutput.emit(gameInfo)
  }

}
