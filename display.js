export class Display {
  constructor(game) {
    this.colors = ["red", "green", "blue", "orange"];
    this.playBtn = document.getElementById("playBtn");
    this.messageBox = document.getElementById("message-box");
    this.squares = document.querySelectorAll(".square");
    this.game = game;
    this.init();
  }

  init() {
    this.playBtn.addEventListener("click", () => {
      this.playSequence();
    });
    this.squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        const selectedColor = index;
        console.log("==> selectedColor", selectedColor);
        console.log("==>", this.game.sequence);
        this.game.playerSequence.push(selectedColor);
        this.highlightColor(selectedColor);
        this.waitForPlayer();
      });
    });
  }

  playSequence() {
    this.game.addColor();
    let sequenceIndex = 0;
    const id = setInterval(() => {
      const colorNumber = this.game.sequence[sequenceIndex];
      console.log("colorNumber  : ", colorNumber, this.game.sequence);
      this.squares[colorNumber].style.opacity = 0.5;
      setTimeout(() => {
        this.squares[colorNumber].style.opacity = 1;
      }, 800);
      sequenceIndex++;
      if (sequenceIndex >= this.game.sequence.length) {
        clearInterval(id);
      }
    }, 1000);
  }

  highlightColor(colorId) {
    const square = this.squares[colorId];
    square.style.opacity = 0.5;
    setTimeout(() => {
      this.clearHighlight(colorId);
    }, 500);
  }

  clearHighlight(colorId) {
    const square = this.squares[colorId];
    square.style.opacity = 1;
  }

  showMessage(message) {
    this.messageBox.textContent = message;
  }

  waitForPlayer() {
    //On compare sa séquence à celle de l'IA
    console.log(
      "wait for player",
      this.game.playerSequence,
      this.game.sequence
    );
    console.log("isEvery...", this.game.isEveryUserSequenceElementsCorrect());
    if (this.game.playerSequence.length === this.game.sequence.length) {
      if (this.game.isEveryUserSequenceElementsCorrect()) {
        //incrementation du round et remise à zéro de la sequence du joueur
        this.game.round++;
        this.game.playerSequence = [];
        //nombre de round max à 5
        if (this.game.round < 5) {
          this.showMessage(`Bravo ! Niveau ${this.game.round} réussi !`);
          setTimeout(() => {
            this.playSequence()
            //la boucle se repéte tant que le joueur n'a pas entré une mauvaise couleur
            // this.game.addColor();
            // this.flashColors(this.game.sequence, () => {
            //   this.waitForPlayer();
            // });
          }, 1500);
        } else {
          this.showMessage(`C'est gagné!`);
        }
      } else {
        this.showMessage(`Raté! Tu as perdu au niveau ${this.game.round}.`);
      }
    } else {
    }
  }
}