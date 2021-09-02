'use strict';

let winningSituations = [
  ['userRock', 'machineRock', 'tie'],
  ['userRock', 'machinePaper', 'Machine'],
  ['userRock', 'machineScissors', 'You'],
  ['userPaper', 'machinePaper', 'tie'],
  ['userPaper', 'machineRock', 'You'],
  ['userPaper', 'machineScissors', 'Machine'],
  ['userScissors', 'machineScissors', 'tie'],
  ['userScissors', 'machineRock', 'Machine'],
  ['userScissors', 'machinePaper', 'You'],
];

let userScore = 0;
let machineScore = 0;
let isGameStarted = false;

function selectWeapon(selectedIcon) {
  isGameStarted = true;
  hideOptions();
  let weapon = selectedIcon.id;
  moveIconForward(weapon);
  checkStatus(weapon);
}

function moveIconForward(weapon) {
  let icon = document.getElementById(weapon);
  switch (weapon) {
    case 'userRock':
    case 'userPaper':
    case 'userScissors': {
      icon.style.left = '310px';
      icon.style.top = '160px';
      icon.classList.remove('userHover');
      break;
    }

    case 'machineRock':
    case 'machinePaper':
    case 'machineScissors': {
      icon.style.left = '-310px';
      icon.style.top = '160px';
      break;
    }
  }
}

function moveIconBack() {
  let userRock = document.getElementById('userRock');
  let userPaper = document.getElementById('userPaper');
  let userScissors = document.getElementById('userScissors');
  let machineRock = document.getElementById('machineRock');
  let machinePaper = document.getElementById('machinePaper');
  let machineScissors = document.getElementById('machineScissors');

  userRock.style.top = machineRock.style.top = '10px';
  userRock.style.left = machineRock.style.left = 0;

  userPaper.style.top = machinePaper.style.top = '200px';
  userPaper.style.left = machinePaper.style.left = 0;

  userScissors.style.top = machineScissors.style.top = '390px';
  userScissors.style.left = machineScissors.style.left = 0;

  userPaper.classList.add('userHover');
  userRock.classList.add('userHover');
  userScissors.classList.add('userHover');
}

function checkStatus(userWeapon) {
  let machineWeapon = chooseMachineWeapon();

  moveIconForward(machineWeapon);
  removeWeaponsOnclick();

  let choices = [userWeapon, machineWeapon];
  let winner = getWinner(choices);

  setTimeout(showScores, 500);
  setTimeout(showWinMessage, 500, winner);
  setTimeout(moveIconBack, 1000);

  let isScoreLimited = document.getElementById('limit').checked;
  let scoreLimit = isScoreLimited ? +document.getElementById('limitNumInp').value : null;

  if (
    isScoreLimited &&
    (scoreLimit === userScore || scoreLimit === machineScore)
  ) {
    removeWeaponsOnclick();
    return;
  }

  setTimeout(function () {
    document.getElementById('whoWon').style.display = 'none';
  }, 1000);
  setTimeout(addWeaponsOnclick, 1000);
}

function chooseMachineWeapon() {
  let machineWeaponChoices = ['machineRock', 'machinePaper', 'machineScissors'];
  let mWeaponIndex = Math.floor(Math.random() * 3);
  let mWeapon = machineWeaponChoices[mWeaponIndex];

  return mWeapon;
}

function getWinner(choices) {
  let winner;

  for (let i = 0; i < winningSituations.length; i++) {
    if (
      winningSituations[i][0] === choices[0] &&
      winningSituations[i][1] === choices[1]
    ) {
      winner = winningSituations[i][2];
    }
  }

  if (winner === 'Machine') {
    machineScore++;
  } else if (winner === 'You') {
    userScore++;
  }

  return winner;
}

function showScores() {
  document.getElementById('machineScore').innerHTML = machineScore;
  document.getElementById('userScore').innerHTML = userScore;
}

function showWinMessage(winner) {
  let messageField = document.getElementById('whoWon');
  messageField.style.display = 'inline-block';

  if (document.getElementById('limit').checked) {
    let limitNum = +document.getElementById('limitNumInp').value;

    if (userScore === limitNum) {
      messageField.innerHTML = `
            <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
             You won the game
            <i class="fa fa-hand-peace-o" aria-hidden="true"></i>`;
      return;
    } else if (machineScore === limitNum) {
      messageField.innerHTML = `
            <i class="fa fa-android" aria-hidden="true"></i>
             Machine won the game
            <i class="fa fa-android" aria-hidden="true"></i>`;
      return;
    }
  }

  if (winner === 'You') {
    messageField.innerHTML = `
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
         You won the round
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>`;
  } else if (winner === 'Machine') {
    messageField.innerHTML = `
        <i class="fa fa-android" aria-hidden="true"></i>
         Machine won the round
        <i class="fa fa-android" aria-hidden="true"></i>`;
  } else {
    messageField.innerHTML = `
        <i class="fa fa-flag-o" aria-hidden="true"></i>
         Tie round
        <i class="fa fa-flag-o" aria-hidden="true"></i>`;
  }
}

function removeWeaponsOnclick() {
  document.getElementById('userRock').setAttribute('onclick', '');
  document.getElementById('userPaper').setAttribute('onclick', '');
  document.getElementById('userScissors').setAttribute('onclick', '');
}

function addWeaponsOnclick() {
  document
    .getElementById('userRock')
    .setAttribute('onclick', 'selectWeapon(this)');
  document
    .getElementById('userPaper')
    .setAttribute('onclick', 'selectWeapon(this)');
  document
    .getElementById('userScissors')
    .setAttribute('onclick', 'selectWeapon(this)');
}

function reset() {
  isGameStarted = false;
  userScore = machineScore = 0;
  document.getElementById('userScore').innerHTML = 0;
  document.getElementById('machineScore').innerHTML = 0;
  document.getElementById('whoWon').style.display = 'none';
  addWeaponsOnclick();
}

function createLimitNumInp(elem) {
  let isChecked = elem.checked;

  if (isChecked) {
    let optionsList = document.getElementById('optionsList');
    let numInpLabel = document.createElement('label');
    numInpLabel.setAttribute('for', 'limitNumInp');
    numInpLabel.setAttribute('id', 'numInpLabel');
    numInpLabel.innerHTML = 'Game ends at: ';
    optionsList.appendChild(numInpLabel);
    let numInp = document.createElement('input');
    numInp.setAttribute('id', 'limitNumInp');
    numInp.setAttribute('type', 'number');
    numInp.setAttribute('name', 'limitNum');
    numInp.setAttribute('min', '1');
    numInp.value = 1;
    numInp.style.width = '50px';
    optionsList.appendChild(numInp);
  } else {
    document.getElementById('numInpLabel').remove();
    document.getElementById('limitNumInp').remove();
  }
}

function showOptions() {
  if (isGameStarted) {
    alert(`Since you have already started the game, you can not access options.
Reset the game to access.`);
    document.getElementById('optionsList').style.display = 'none';
    return;
  }

  let options = document.getElementById('optionsList');
  options.style.display = 'inline-block';
  
  document.getElementById('options').setAttribute('onclick', 'hideOptions()');  
}

function hideOptions() {
  let options = document.getElementById('optionsList');
  options.style.display = 'none';
  
  document.getElementById('options').setAttribute('onclick', 'showOptions()');
}
