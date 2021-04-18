const HINT_RGB = document.getElementById('rgb-color');
const GAME_COLORS = document.getElementById('game-colors');

function randomRgbColor() {
  const COLORS = [];
  for (let index = 0; index < 3; index += 1) {
    COLORS.push(Math.floor(Math.random() * 256));
  }
  const RANDOM_COLORS = `rgb(${COLORS[0]},${COLORS[1]},${COLORS[2]})`;
  return RANDOM_COLORS;
}

const WIN_INDEX = Math.floor(Math.random() * 6);

function gameColors() {
  let winColor;
  for (let index = 0; index < 6; index += 1) {
    const NEW_COLOR = document.createElement('div');
    NEW_COLOR.className = 'ball';
    NEW_COLOR.style.backgroundColor = randomRgbColor();
    GAME_COLORS.appendChild(NEW_COLOR);
    if (index === WIN_INDEX) {
      winColor = NEW_COLOR.style.backgroundColor;
    }
  }
  return winColor;
}

let winner = gameColors();
let end = winner.length;
HINT_RGB.innerText = winner.substring(3, end);

const ANSWER = document.getElementById('answer');
const SCORE = document.getElementById('score');

GAME_COLORS.addEventListener('click', (event) => {
  const SELECTED = event.target;
  let YOUR_SCORE = parseInt(sessionStorage.getItem('score'), 10);
  if (SELECTED.style.backgroundColor === winner) {
    ANSWER.innerText = 'Acertou!';
    document.body.style.backgroundColor = 'green';
    YOUR_SCORE += 3;
    sessionStorage.setItem('score', YOUR_SCORE);
    SCORE.innerText = `Placar: ${YOUR_SCORE}`;
  } else {
    document.body.style.backgroundColor = 'red';
    ANSWER.innerText = 'Errou! Tente novamente!';
  }
});

const RESET_GAME = document.getElementById('reset-game');

RESET_GAME.addEventListener('click', () => {
  ANSWER.innerText = 'Escolha uma cor';
  while (GAME_COLORS.firstChild) {
    GAME_COLORS.firstChild.remove();
  }
  document.body.style.backgroundColor = 'salmon';
  winner = gameColors();
  end = winner.length;
  HINT_RGB.innerText = winner.substring(3, end);
});

window.onload = () => {
  sessionStorage.setItem('score', 0);
};
