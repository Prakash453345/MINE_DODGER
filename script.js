let buttons = document.querySelectorAll('#boxes button');
let tag = document.querySelector('#tagline');
let mines = 3;
let mineloc = [];
let messageElement = null;
let gameOver = false;
let restart = document.createElement('button');
let safeButtonsClicked = 0;
let totalSafeButtons = buttons.length - mines;

restart.textContent = "Play Again";
restart.classList.add("restart-button");

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

// Adjust styles for mobile
function adjustStylesForMobile() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Adjust button size and layout for mobile view
    buttons.forEach(button => {
      button.style.width = '50px';
      button.style.height = '50px';
      button.style.fontSize = '20px';
    });

    // Adjust restart button
    restart.style.fontSize = '14px';
    restart.style.padding = '8px 20px';
    restart.style.fontWeight = 'bold';
    restart.style.borderRadius = '5px';

    // Adjust message style
    if (messageElement) {
      messageElement.style.marginLeft = '0';
      messageElement.style.textAlign = 'center';
    }
  } else {
    // Reset back to default sizes for larger screens
    buttons.forEach(button => {
      button.style.width = '80px';
      button.style.height = '80px';
      button.style.fontSize = '24px';
    });

    // Reset restart button for larger screens
    restart.style.fontSize = '16px';
    restart.style.padding = '10px 25px';

    // Reset message style
    if (messageElement) {
      messageElement.style.marginLeft = '30px';
      messageElement.style.textAlign = 'left';
    }
  }
}

// Apply styles when window is resized
window.addEventListener('resize', adjustStylesForMobile);

// Call the function to adjust styles when the game starts
adjustStylesForMobile();

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
      messageElement.style.marginLeft = '30px';
      messageElement.style.color = '#dc3545';
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
        messageElement.innerText = `Congratulations! You found all the diamonds!`;
        messageElement.style.color = '#28a745';
        messageElement.style.marginLeft = '30px';
        tag.after(messageElement);
        
        buttons.forEach(btn => {
          btn.disabled = true;
        });
        
        restart.style.display = 'block';
      } 

      else {
        messageElement = document.createElement('h3');
        messageElement.innerText = `Safe! Keep going.`;
        messageElement.style.color = '#28a745';
        messageElement.style.marginLeft = '30px';
        tag.after(messageElement);
      }
    }
  });
});

placeMines();  
placeDiamonds();
