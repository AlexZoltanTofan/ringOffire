import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent {
  constructor(private firestore: Firestore, private router: Router) {}
  ngOnInit(): void {}

  async newGame() {
    //Start game
    let game = new Game();

    const aCollection = collection(this.firestore, 'games');
    let gameInfo = await addDoc(aCollection, game.toJson()).then(
      (gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      }
    );
  }
}
