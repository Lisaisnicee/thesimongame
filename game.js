class Game {
  constructor() {
    this.sequence = [];
    this.playerSequence = [];
    this.round = 0;
    this.colorsNumber=4
  }


  reset(){
    this.round = 0;
    this.sequence = [];
    this.playerSequence = [];
  }

  //méthode qui permet à l'IA d'ajouter une couleur aléatoire à sa séquence
  addColor() {
    const nextColorNumber =Math.floor(Math.random() * this.colorsNumber);
    this.sequence.push(nextColorNumber);
   
  }

  checkTap(color) {
    this.playerSequence.push(color);
    this.waitForPlayer();
  }

  isEveryUserSequenceElementsCorrect() {
    for (let i = 0; i < this.playerSequence.length; i++) {
      if (this.playerSequence[i] !== this.sequence[i]) {
    
        return false;
        
      }
    }
    return true;
}

}