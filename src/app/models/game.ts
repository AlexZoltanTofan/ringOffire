export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public payedCards: string[] = [];
  public currentPlayer: number = 0;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push(i + '_of_spades');
      this.stack.push(i + '_of_hearts');
      this.stack.push(i + '_of_clubs');
      this.stack.push(i + '_of_diamonds');
    }
    this.shuffle(this.stack);
  }

  public shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
