class Game {
  constructor() {
    this.colors = ["red", "green", "blue", "orange"];
    this.sequence = [];
    this.playerSequence = [];
    this.round = 0;
  }

  init(display) {
    this.display = display;
    this.display.init(this);
  }

  play() {
    this.round = 0;
    this.sequence = [];
    this.playerSequence = [];
    this.display.showMessage('À ton tour !');
    setTimeout(() => {
      //L'IA ajoute une couleur et l'anime sur l'écran
      this.addColor();
      this.display.flashColors(this.sequence, () => {
        //On attend que le joueur entre sa séquence de couleurs
        this.waitForPlayer();
      });
    }, 1500);
  }

  waitForPlayer() {
    //On compare sa séquence à celle de l'IA
    if (this.playerSequence.length === this.sequence.length) {
      //every pour comparer le contenu des deux sequences
      if (this.playerSequence.every((val, i) => val === this.sequence[i])) {
        //incrementation du round et remise à zéro de la sequence du joueur
        this.round++;
        this.playerSequence = [];
        //nombre de round max à 5
        if (this.round < 5) {
          this.display.showMessage(`Bravo ! Niveau ${this.round} réussi !`);
          setTimeout(() => {
            //la boucle se repéte tant que le joueur n'a pas entré une mauvaise couleur
            this.addColor();
            this.display.flashColors(this.sequence, () => {
              this.waitForPlayer();
            });
          }, 1500);
        } else {
          this.display.showMessage(`C'est gagné!`);
        }
      } else {

        this.display.showMessage(`Oops! Tu as perdu au niveau ${this.round}.`);
      }
    }

    else {

      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => {
        square.addEventListener('click', () => {


          const selectedColor = square.id;
          this.playerSequence.push(selectedColor);
          this.display.highlightColor(selectedColor);
          setTimeout(() => {
            this.display.clearHighlight(selectedColor);
          }, 500);
          this.waitForPlayer();


        });
      });
    }
  }

  //méthode qui permet à l'IA d'ajouter une couleur aléatoire à sa séquence
  addColor() {
    const nextColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];

    this.sequence.push(nextColor);
    console.log("ia adding a color: " + this.sequence);
  }

  checkTap(color) {
    this.playerSequence.push(color);
    this.waitForPlayer();
  }
}
