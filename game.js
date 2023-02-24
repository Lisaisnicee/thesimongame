class Game {
  constructor() {
    this.sequence = [];
    this.playerSequence = [];
    this.round = 0;
    this.colorsNumber=4
  }

  // init(display) {
  //   this.display = display;
  //   this.display.init(this);
  // }

  reset(){
    this.round = 0;
    this.sequence = [];
    this.playerSequence = [];
  }

  //méthode qui permet à l'IA d'ajouter une couleur aléatoire à sa séquence
  addColor() {
    const nextColorNumber =Math.floor(Math.random() * this.colorsNumber);
    this.sequence.push(nextColorNumber);
    console.log("ia adding a color: " + this.sequence);
  }

  checkTap(color) {
    this.playerSequence.push(color);
    this.waitForPlayer();
  }

  isEveryUserSequenceElementsCorrect(){
    // const lastIndex = this.playerSequence.length-1
    // return this.playerSequence[lastIndex]===this.sequence[lastIndex] ? true : false
    return this.playerSequence.every((val, i) => val === this.sequence[i])
  }
}
