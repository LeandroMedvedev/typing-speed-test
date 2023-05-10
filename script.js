const testWrapper = document.querySelector('.test-wrapper');
const testArea = document.querySelector('#test-area');
const originText = document.querySelector('#origin-text p').innerHTML;
const resetButton = document.querySelector('#reset');
const theTimer = document.querySelector('.timer');

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

const addZero = (time) => {
  if (time <= 9) {
    time = '0' + time;
  }
  return time;
};

const runTimer = () => {
  let currentTime =
    addZero(timer[0]) + ':' + addZero(timer[1]) + ':' + timer[2];
  theTimer.textContent = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
};

const spellCheck = () => {
  const textEntered = testArea.value;
  const originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered === originText) {
    clearInterval(interval);
    testWrapper.style.borderColor = '#50954a';
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = '#65ccf3';
    } else {
      testWrapper.style.borderColor = '#8b0000';
    }
  }
};

const startTimer = () => {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10); // 10 milissegundos
  }
};

const reset = () => {
    clearInterval(interval);
    interval = null;  //*
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = '';
    theTimer.innerHTML = '00:00:00';
    testWrapper.style.borderColor = '#808080';
};

// Listeners de eventos para entrada de teclado e o botão de recomeçar
testArea.addEventListener('keypress', startTimer, false);
testArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', reset, false);

/*
    var timer = [0,    0,    0,    0];
                 min   sec   cent  mil

    timer[0] = Math.floor((timer[3]/100)/60);

    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
                                           (ao atingir 60s, retorna a 0s)
    
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));                          
*/

/*
    const reset = () => {
        ...
        interval = null;
    }
    Quando eu atribuir o intervalo definido na próxima vez que iniciar a 
    aplicação, não será criado um novo intervalo com novo número de índice. 
    Pois isso executaria múltiplos processos no navegador simultaneamente, 
    desperdiçando recursos.
*/
