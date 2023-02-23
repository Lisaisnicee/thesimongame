export class Display {
  constructor() {
    this.playBtn = document.getElementById("playBtn");
    this.messageBox = document.getElementById("message-box");
  }

  init(game) {
    this.game = game;
    this.playBtn.addEventListener("click", () => {
      this.game.play();
    });
  }
  flashColors(colorsList, callback) {
    const delayTime = 1000;
    let i = 0;

    const flashColor = () => {
      if (i >= colorsList.length) {
        if (callback) {
          callback();
        }
        return;
      }

      const color = colorsList[i];

      const square = document.getElementById(color);
      const originalColor = square.style.backgroundColor;

      square.style.backgroundColor = "dark" + color;
      setTimeout(() => {
        square.style.backgroundColor = originalColor;
        i++;
        flashColor();
      }, delayTime);
    };

    flashColor();
  }

  highlightColor(color) {
    const square = document.getElementById(color);
    const brightColor = "light" + color;
    square.style.backgroundColor = brightColor;
  }
  
  clearHighlight(color) {
    const square = document.getElementById(color);
    square.style.backgroundColor = color;
  }
  
  showMessage(message) {
    this.messageBox.textContent = message;
  }
}

