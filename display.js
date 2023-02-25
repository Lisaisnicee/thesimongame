const audioGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const audioRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const audioOrange = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const audioBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


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
        this.playSound(index)
        this.game.playerSequence.push(selectedColor);
        this.highlightColor(selectedColor);
        if (!this.game.isEveryUserSequenceElementsCorrect()) {
          this.showMessage(`Raté! Tu as perdu au niveau ${this.game.round}.\n Appuies sur Play pour jouer à nouveau`);
          this.game.reset();
          setTimeout(() => {
            this.showMessage("");
          }, 2500);
          return false;
        }
        this.waitForPlayer();
      });
    });
  }



  playSequence() {
    this.game.addColor();
    let sequenceIndex = 0;
    const id = setInterval(() => {
      const colorNumber = this.game.sequence[sequenceIndex];
      this.squares[colorNumber].style.opacity = 0.1;
      this.playSound(colorNumber)
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

  updateRoundNumber() {
    const roundNumber = document.getElementById("round");
    roundNumber.textContent = ` ${this.game.round}`;
  }

  showMessage(message) {
    this.messageBox.textContent = message;
  }



  playSound(color) {
    switch (color) {
      case 0:
        audioGreen.currentTime = 0;
        audioGreen.play();
        break;
      case 1:
        audioRed.currentTime = 0;
        audioRed.play();
        break;
      case 2:
        audioOrange.currentTime = 0;
        audioOrange.play();
        break;
      case 3:
        audioBlue.currentTime = 0;
        audioBlue.play();
        break;
     
    }
  }

  waitForPlayer() {
    if (this.game.playerSequence.length === this.game.sequence.length) {
      if (this.game.isEveryUserSequenceElementsCorrect()) {
        this.game.round++;
        this.game.playerSequence = [];
  

        if (this.game.round < 45) {
          this.showMessage(`Bravo ! Niveau ${this.game.round} réussi !`);
         
          this.updateRoundNumber(this.game.round)
          setTimeout(() => {
            this.playSequence()
          }, 1500);
        } else {
          this.showMessage(`C'est gagné!\n Appuies sur Play si tu veux rejouer`);
          this.game.reset()
          setTimeout(() => {
            this.messageBox.textContent = '';
          }, 2000); 
          
        }
      } else {
        this.showMessage(`Raté! Tu as perdu au niveau ${this.game.round}.\n Appuies sur Play pour jouer à nouveau`);
       
        this.game.reset();
        setTimeout(() => {
          this.messageBox.textContent = '';
        }, 2000); 
      }
    }
  }
  
}

