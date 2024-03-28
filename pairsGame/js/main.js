import Card from './card.js';


function shuffleNumbers(arr) {
  let j, k
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    k = arr[j];
    arr[j] = arr[i];
    arr[i] = k;
  }
  return arr
}

let gameTimer;
let interval;

function gameTime(seconds){
  let timer = document.createElement('p')
  timer.classList.add('timer')
  timer.textContent = seconds * 0.001
  document.getElementById('game').append(timer)

  interval = setInterval(() => {
    let valueTimer = parseInt(timer.textContent);
    if (valueTimer > 0) {
      timer.textContent = valueTimer - 1
    } else if (valueTimer === 0) {
      clearInterval(interval)
    };
  }, 1000)


  gameTimer = setTimeout(() => {
    alert('Время закончилось')
    document.getElementById('game').innerHTML = '';
    document.getElementById('reset').innerHTML = '';
    choiceRulesGame(4)
    choiceRulesGame(8)
    choiceRulesGame(12)
    choiceRulesGame(16)
    choiceRulesGame(20)
  }, seconds + 30)
}


function newGame(container, cardsCount, shuffle) {
  let numbersArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    numbersArray.push(i, i)
  }

  shuffle(numbersArray);

  for (let cardNumber of numbersArray) {
    cardsArray.push(new Card(container, cardNumber, flip))
  }

  clearInterval(interval)
  clearTimeout(gameTimer);
  gameTime(60000)
  resetButton()

  let timerId;

  function flip(card){
    clearTimeout(timerId);

    if (firstCard !== null && secondCard !== null) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        timerId = setTimeout(() => {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }, 550)
      }
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }
    if (document.querySelectorAll('.card.success').length == numbersArray.length) {
      setTimeout(() => {
        alert ('Победа!')
        clearTimeout(gameTimer);
        container.innerHTML = ''
        document.getElementById('reset').innerHTML = ''
        numbersArray = [];
        cardsArray = [];
        firstCard = null;
        secondCard = null;
        choiceRulesGame(4)
        choiceRulesGame(8)
        choiceRulesGame(12)
        choiceRulesGame(16)
        choiceRulesGame(20)
        choiceRulesGame(24)
      }, 150)
    }
  }

}

function settings() {
  document.getElementById('game').innerHTML = '';
  document.getElementById('game').classList.remove('game-choice')
  document.getElementById('main').classList.remove('main');
  document.getElementById('main').classList.add('main-in-game');
  document.querySelector('.head').textContent = 'Игра в пары'
  document.querySelector('.head').classList.remove('head-choice')
}


function choiceRulesGame(complexity) {
  document.getElementById('main').classList.remove('main-in-game');
  document.getElementById('main').classList.add('main');
  document.getElementById('game').classList.add('game-choice')
  document.querySelector('.head').textContent = 'Выберите сложность'
  document.querySelector('.head').classList.add('head-choice')

  let choiceComplexity = document.createElement('button');
  choiceComplexity.classList.add('choice-btn')
  document.getElementById('game').append(choiceComplexity);
  choiceComplexity.textContent = `${complexity} карт`;


  choiceComplexity.addEventListener('click', () => {
    settings()
    newGame(document.getElementById('game'), complexity, shuffleNumbers);
  })
}

function resetButton() {
  let resetBtn = document.createElement('button')
  resetBtn.classList.add('reset-btn')
  resetBtn.textContent = 'Рестарт'
  document.getElementById('reset').append(resetBtn)

  resetBtn.addEventListener('click', () => {
    clearTimeout(gameTimer)
    document.getElementById('game').innerHTML = ''
    document.getElementById('reset').innerHTML = ''
    choiceRulesGame(4)
    choiceRulesGame(8)
    choiceRulesGame(12)
    choiceRulesGame(16)
    choiceRulesGame(20)
    console.log('123')
  })
}



choiceRulesGame(4)
choiceRulesGame(8)
choiceRulesGame(12)
choiceRulesGame(16)
choiceRulesGame(20)

