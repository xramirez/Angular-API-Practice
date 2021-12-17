export interface User {
    name:string;
    score: {
        perfectWin:number
        easyWin:number;
        easyLoss:number;
        medWin:number;
        medLoss:number;
        hardWin:number;
        hardLoss:number;
    }
    stats: {
        highestScore:number;
        favLetter:string;
        favTF:string;
    }
}