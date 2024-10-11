const listKeys = ['A', 'S', 'D', 'F', 'G'];
let currentKey = '';
let score = 0;
let timer = 5;
let intervalId;
let speed = 1000; 
const remainingKeys = [...listKeys]; 


const fallingKeyElement = document.getElementById('fallingKey');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const remainingKeysElement = document.getElementById('remainingKeys');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameContainer = document.querySelector('.game-container');
const progressBar = document.querySelector('.progress');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const closeModal = document.getElementById('closeModal');


function startGame() {
    document.body.style.background = 'linear-gradient(to bottom, #ff7e5f, #feb47b)'; 
    gameContainer.style.display = 'block'; 
    startBtn.style.display = 'none'; 
    restartBtn.style.display = 'none'; 
    resultModal.style.display = 'none'; 
    score = 0;
    remainingKeys.length = 0;
    remainingKeys.push(...listKeys); 
    speed = 1000; 
    updateRemainingKeys();
    nextKey(); 
}



function nextKey() {
    if (remainingKeys.length === 0) {
        showResult("Победа! Вы нажали все клавиши правильно!");
        return;
    }

    currentKey = remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
    console.log(`Загаданная клавиша: ${currentKey}`);
    fallingKeyElement.textContent = currentKey;
    fallingKeyElement.style.top = '0px';
    fallingKeyElement.style.left = Math.random() * (300 - 50) + 'px';

    updateRemainingKeys();
    startTimer();
}


function startTimer() {
    timer = 5;
    timerElement.textContent = timer;
    progressBar.style.width = '100%';
    intervalId = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        progressBar.style.width = (timer / 5) * 100 + '%';
        if (timer <= 0) {
            showResult("Поражение! Время вышло.");
        }
        fallingKeyElement.style.top = parseInt(fallingKeyElement.style.top) + 5 + 'px';
        if (parseInt(fallingKeyElement.style.top) > 500) {
            showResult('Поражение! Клавиша пропала.');
        }
    }, speed);
}


function onKeyPress(event) {
    const pressedKey = event.key.toUpperCase(); 
    if (pressedKey === currentKey) {
        score += timer;
        scoreElement.textContent = score;
        clearInterval(intervalId);
        remainingKeys.splice(remainingKeys.indexOf(currentKey), 1);
        speed = Math.max(200, speed - 100); 
        nextKey();
    } else {
        console.log(`Нажата клавиша: ${pressedKey}, ожидалась: ${currentKey}`); 
    }
}

/* Обновление оставшихся клавиш */
function updateRemainingKeys() {
    remainingKeysElement.textContent = remainingKeys.join(', ');
}

/* Функция показа результата (всплывающее окно) */
function showResult(message) {
    clearInterval(intervalId);
    resultMessage.textContent = message;
    resultModal.style.display = 'flex'; 
    restartBtn.style.display = 'block'; 
}

/* Привязка событий */
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
closeModal.addEventListener('click', () => resultModal.style.display = 'none');
document.addEventListener('keydown', onKeyPress);

/* Начало игры */
updateRemainingKeys();
