import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  allProfilePictures = [
    'player1.png',
    'player2.png',
    'player3.png',
    'angry.png',
    'player4.png',
    'player5.png',
    'player6.jpg',
    'player7.png',
    'smile.png',
    'animal.png',
    'chamois.png',
    'dog.png',
    'monkey.png',
    'tiger.png',
    'zebra.png',
    'ghost.png',
  ];
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}
}
