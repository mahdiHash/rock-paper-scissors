'use strict';

let situations = [
    ['userRock', 'machineRock', 'tie'],
    ['userRock', 'machinePaper', 'machine'],
    ['userRock', 'machineScissors', 'you'],
    ['userPaper', 'machinePaper', 'tie'],
    ['userPaper', 'machineRock', 'you'],
    ['userPaper', 'machineScissors', 'machine'],
    ['userScissors', 'machineScissors', 'tie'],
    ['userScissors', 'machineRock', 'machine'],
    ['userScissors', 'machinePaper', 'you'],
];

let userScore = 0, machineScore = 0;

function selectIcon(elem) {
    let weapon = elem.id;
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
    removeOnclick();
    let choices = [userWeapon, machineWeapon];
    let winner = getWinner(choices);
    setTimeout(evaluateScore, 500, winner);
    setTimeout(showWinMessage, 500, winner);
    setTimeout(moveIconBack, 1000);
    setTimeout(function() {
        document.getElementById('whoWon').style.display = 'none';
    }, 1000);
    setTimeout(addOnclick, 1000);
}

function chooseMachineWeapon() {
    let machineChoices = ['machineRock', 'machinePaper', 'machineScissors'];
    let mWeaponIndex = Math.floor(Math.random() * 3);
    let mWeapon = machineChoices[mWeaponIndex];
    return mWeapon;
}

function getWinner(choices) {
    let winner;
    for (let i = 0; i < situations.length; i++) {
        if (situations[i][0] === choices[0] && situations[i][1] === choices[1]) {
            winner = situations[i][2];
        }
    }
    return winner;
}

function evaluateScore(winner) {
    if (winner === 'machine') {
        document.getElementById('machineScore').innerHTML = ++machineScore;
    } else if (winner === 'you') {
        document.getElementById('userScore').innerHTML = ++userScore;
    }
}

function showWinMessage(winner) {
    let messageField = document.getElementById('whoWon');
    messageField.style.display = 'inline-block';
    if (winner === 'you') {
        messageField.innerHTML = `
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
         You won
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>`;
    } else if (winner === 'machine') {
        messageField.innerHTML = `
        <i class="fa fa-android" aria-hidden="true"></i>
         Machine won
        <i class="fa fa-android" aria-hidden="true"></i>`;
    } else {
        messageField.innerHTML = `
        <i class="fa fa-flag-o" aria-hidden="true"></i>
         Tie
        <i class="fa fa-flag-o" aria-hidden="true"></i>`;
    }
}

function removeOnclick() {
    document.getElementById('userRock').setAttribute('onclick', '');
    document.getElementById('userPaper').setAttribute('onclick', ''); 
    document.getElementById('userScissors').setAttribute('onclick', '');
}

function addOnclick() {
    document.getElementById('userRock').setAttribute('onclick', 'selectIcon(this)'); 
    document.getElementById('userPaper').setAttribute('onclick', 'selectIcon(this)'); 
    document.getElementById('userScissors').setAttribute('onclick', 'selectIcon(this)');
}