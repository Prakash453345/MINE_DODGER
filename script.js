let buttons = document.querySelectorAll('#boxes button');
let tag = document.querySelector('#tagline');
let mines = 3;
let mineloc = [];
let messageElement = null;
let gameOver = false;
let restart = document.createElement('button');
let safeButtonsClicked = 0;
let totalSafeButtons = buttons.length - mines;

restart.textContent="Play Again";
restart.classList.add("restart-button") ;

restart.addEventListener('click', () => {
  resetGame();
});

tag.after(restart);

function resetGame() {
  mineloc = [];
  gameOver = false;
  safeButtonsClicked = 0;
  

  buttons.forEach(button => {
    button.innerHTML = '';
    button.disabled = false;
  });
  
  if (messageElement) {
    messageElement.remove();
    messageElement = null;
  }
  
  restart.style.display = 'none';
  
  placeMines();
  placeDiamonds();
}

function placeMines() {
  while (mineloc.length < mines) {
    let rand = Math.floor(Math.random() * buttons.length);
    if (!mineloc.includes(rand)) {
      mineloc.push(rand);
      let mineSpan = document.createElement('span');
      mineSpan.textContent = "💣";
      mineSpan.style.fontSize = "40px";
      mineSpan.style.display = "flex";
      mineSpan.style.justifyContent = "center";
      mineSpan.style.alignItems = "center";
      mineSpan.style.height = "100%";
      buttons[rand].appendChild(mineSpan);
      mineSpan.style.visibility = 'hidden'; 
    }
  }
}

function placeDiamonds() {
  for (let i = 0; i < buttons.length; i++) {
    if (!mineloc.includes(i)) {
      let diamondSpan = document.createElement('span');
      diamondSpan.textContent = "💎";
      diamondSpan.style.fontSize = "40px";
      diamondSpan.style.display = "flex";
      diamondSpan.style.justifyContent = "center";
      diamondSpan.style.alignItems = "center";
      diamondSpan.style.height = "100%";
      buttons[i].appendChild(diamondSpan);
      diamondSpan.style.visibility = 'hidden'; 
    }
  }
}

function revealAllMines() {
  mineloc.forEach(index => {
    let mineButton = buttons[index];
    let mineSpan = mineButton.querySelector('span');
    mineSpan.style.visibility = 'visible';
  });
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (gameOver) return;
    
    if (messageElement) {
      messageElement.remove();
    }
    
    let symbolSpan = button.querySelector('span'); 
    if (mineloc.includes(index)) {
      gameOver = true;
      symbolSpan.style.visibility = 'visible';
      messageElement = document.createElement('h3'); 
      messageElement.classList.add("msg-lost")
      messageElement.innerText = `Boom! You hit a mine.`;
      tag.after(messageElement);
      
      
      buttons.forEach(btn => {
        btn.disabled = true;
      });
      revealAllMines();
      
      restart.style.display = 'block';
    } 
    else {
      symbolSpan.style.visibility = 'visible'; 
      safeButtonsClicked++;
      
      button.disabled = true;
    
      if (safeButtonsClicked === totalSafeButtons) {
        gameOver = true;
        messageElement = document.createElement('h3');
        messageElement.classList.add("msg-win")
        messageElement.innerText = `Congratulations! You found all the diamonds!`;
        tag.after(messageElement);
        
        buttons.forEach(btn => {
          btn.disabled = true;
        });
        
        restart.style.display = 'block';
      } 

      else {
        messageElement = document.createElement('h3');
        messageElement.innerText = `Safe! Keep going.`;
        messageElement.classList.add("msg-win");
        tag.after(messageElement);
      }
    }
  });
});

placeMines();  
placeDiamonds();
