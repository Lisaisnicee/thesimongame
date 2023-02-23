class Game {
  constructor() {
    this.colors = ["red", "green", "blue", "orange"];
    this.pattern = [];
    this.playerPattern = [];
    this.round = 0;
  }

  init(display) {
    this.display = display;
    this.display.init(this);
  }

  play() {
    this.round = 0;
    this.pattern = [];
    this.playerPattern = [];
    this.display.showMessage('À ton tour !');
    setTimeout(() => {
      this.addColor();
      this.display.flashColors(this.pattern, () => {
        this.waitForPlayer();
      });
    }, 1500);
  }
  
  waitForPlayer() {
    if (this.playerPattern.length === this.pattern.length) {
      if (this.playerPattern.every((val, i) => val === this.pattern[i])) {
       
        this.round++;
        this.playerPattern = [];
        if (this.round < 5) {
          this.display.showMessage(`Bravo ! Niveau ${this.round} réussi !`);
          setTimeout(() => {
            this.addColor();
            this.display.flashColors(this.pattern, () => {
              this.waitForPlayer();
            });
          }, 1500);
        } else {
          this.display.showMessage(`C'est gagné!`);
        }
      } else {

        this.display.showMessage(`Raté! Tu as perdu au niveau ${this.round}.`);
      }
    } else {
     
      const squares = document.querySelectorAll('.square');
      squares.forEach((square) => {
        square.addEventListener('click', () => {
          const selectedColor = square.id;
          this.playerPattern.push(selectedColor);
          this.display.highlightColor(selectedColor);
          setTimeout(() => {
            this.display.clearHighlight(selectedColor);
          }, 500);
          this.waitForPlayer();
        });
      });
    }
  }
  

  addColor() {
    const nextColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
 
    this.pattern.push(nextColor);
    console.log("ia adding a color: " + this.pattern);
  }
  checkTap(color) {
    this.playerPattern.push(color);
    this.waitForPlayer();
  }
}
