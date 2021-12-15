import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { TriviaService } from '../trivia.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results: Array<any> = [];
  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
    //Just gonna test to see if we actually get results here:
    this.getTrivia();

  }
  getTrivia() {
    this.triviaService.getTrivia({ category: '15', difficulty: 'medium', choiceType: 'multiple' })
      .then((resp: any) => {
        this.results = resp.results;
        console.log(this.results)
      }).catch(console.log)
  }
}
