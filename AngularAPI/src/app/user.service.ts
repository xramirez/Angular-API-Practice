import { Injectable } from '@angular/core';
import { User } from 'src/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }

  getUser(name: string): User {
    let allUsers = this.getUsers();
    return allUsers.find(item => item.name === name)!;
  }

  getNames() {
    let allUsers = this.getUsers();
    let userNames = [];
    for (let user of allUsers) {
      userNames.push(user.name);
    }

    return userNames;
  }

  generateUser(name: string) {
    let allUsers = this.getUsers();
    let newUser = {
      name: name,
      score: { perfectWin: 0, easyWin: 0, easyLoss: 0, medWin: 0, medLoss: 0, hardWin: 0, hardLoss: 0 },
      stats: { highestScore: 0, favLetter: '', favTF: '' }
    };
    allUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(allUsers))
  }

  addScore(name: string, score: number, difficulty: string) {
    //First we grab all users and the specific user that got a new score
    let allUsers = this.getUsers();
    let activeUser = allUsers.find(item => item.name === name)!
    let activeIndex = allUsers.findIndex(item => item.name === name);
    console.log(activeIndex);
    console.log(activeUser);

    //Then we do a buuuunch of score calculation
    if (score > activeUser.stats.highestScore)
      activeUser.stats.highestScore = score;

    if (score === 10) {
      switch (difficulty) {
        case 'easy':
          activeUser.score.easyWin += 1;
          activeUser.score.perfectWin += 1;
          break;
        case 'medium':
          activeUser.score.medWin += 1;
          activeUser.score.perfectWin += 1;
          break;
        case 'hard':
          activeUser.score.hardWin += 1;
          activeUser.score.perfectWin += 1;
          break;
        default:
          activeUser.score.easyWin += 1;
          activeUser.score.perfectWin += 1;
          break;
      }
    }
    else if (score > 7) {
      switch (difficulty) {
        case 'easy':
          activeUser.score.easyWin += 1;
          break;
        case 'medium':
          activeUser.score.medWin += 1;
          break;
        case 'hard':
          activeUser.score.hardWin += 1;
          break;
        default:
          activeUser.score.easyWin += 1;
          break;
      }
    }
    else {
      switch (difficulty) {
        case 'easy':
          activeUser.score.easyLoss += 1;
          break;
        case 'medium':
          activeUser.score.medLoss += 1;
          break;
        case 'hard':
          activeUser.score.hardLoss += 1;
          break;
        default:
          activeUser.score.easyLoss += 1;
      }
    }

    //Finally, we're going to put the activeUser, with newly calculated scores, back into the full list, and then back into the database storage
    allUsers[activeIndex] = activeUser;

    localStorage.setItem("users", JSON.stringify(allUsers))
  }

  calculateWins(name: string) {
    let user = this.getUser(name)
    return (user.score.easyWin + user.score.medWin + user.score.hardWin)
  }

  calculateLoss(name: string) {
    let user = this.getUser(name)
    return (user.score.easyLoss + user.score.medLoss + user.score.hardLoss)
  }

  returnScore(name: string, difficulty: string): [number, number] {
    let user = this.getUser(name);
    if (difficulty === 'easy') {
      return [user.score.easyWin, user.score.easyLoss]
    }
    else if (difficulty === 'medium') {
      return [user.score.medWin, user.score.medLoss]
    }
    else if (difficulty === 'hard') {
      return [user.score.hardWin, user.score.hardLoss]
    }
    else if (difficulty === 'perfect') {
      console.log(user.score.perfectWin);
      return [user.score.perfectWin, 0]
    }
    return [0, 0]
  }

  clearDatabase() {
    localStorage.clear();
  }
}
