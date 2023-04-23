import { Component, HostListener, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Game } from 'src/models/game';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  setDoc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game = new Game();
  name: string = '';
  gameOver = false;
  topPosition = 20;
  bottomPosition = 70;
  players: Array<any>;
  games$: Observable<any>;
  gameId: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.newGame();
    this.route.params.subscribe((params) => {
      const gameId = params['gameInfo.id'];
      this.gameId = gameId;
      const gameDoc = doc(collection(this.firestore, 'games'), this.gameId);
      this.games$ = docData(gameDoc);
      //subscribe will notify us if changes where made to the specific game
      this.games$.subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.payedCards = game.payedCards;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }

  async newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      //we splace the last image from array stack; ?? ''This will assign an empty string to currentCard if the result of pop() is undefined.
      this.game.currentCard = this.game.stack.pop() ?? '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.payedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('player1.png');
        this.saveGame();
      }
    });
  }

  async saveGame() {
    const coll = collection(this.firestore, 'games');
    const docRef = doc(coll, this.gameId);
    this.games$ = docData(docRef);
    await updateDoc(doc(coll, this.gameId), this.game.toJson());
  }

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
}
