import { Component, HostListener } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game = new Game();
  animal: string = '';
  name: string = '';
  topPosition = 100;
  bottomPosition = 90;

  constructor(public dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateTopPosition();
    this.updateBottomPosition();
  }

  updateTopPosition() {
    if (window.innerWidth <= 720) {
      this.topPosition = 30;
    } else {
      this.topPosition = 100;
    }
  }

  updateBottomPosition() {
    if (window.innerWidth <= 720) {
      this.bottomPosition = 60;
    } else {
      this.bottomPosition = 90;
    }
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  //we splace the last image from array stack; ?? ''This will assign an empty string to currentCard if the result of pop() is undefined.
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() ?? '';
      console.log(this.currentCard);

      this.pickCardAnimation = true;
      console.log(this.game);

      this.game.currentPlayer++;

      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      console.log(this.game.currentPlayer);
      setTimeout(() => {
        this.game.payedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed', name);
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

// animal: string;
// name: string;

// constructor(public dialog: MatDialog) {}

// }
